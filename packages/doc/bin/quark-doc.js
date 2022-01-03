#!/usr/bin/env node

/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/

const fs = require('fs-extra');
const root = process.cwd();

const config = fs.pathExistsSync(root + '/quark-doc.config.js') ? require(root + '/quark-doc.config.js') : {
    srcDir: 'docs_src',
    destDir: 'docs'
};

if (config) {
    if (!config.srcDir) {
        config.srcDir = 'docs_src';
    }

    if (!config.destDir) {
        config.destDir = 'docs';
    }
}

function getFiles(path) {
    let files = [];
    const fileInfo = fs.readdirSync(path, { withFileTypes: true });

    fileInfo.forEach(info => {
        if (info.isDirectory()) {
            files = [...files, ...getFiles(`${path}/${info.name}`)];
        } else {
            const fn = info.name.toLowerCase();
            const ext = fn.substring(fn.lastIndexOf('.') + 1);

            if ((ext === 'js') && (info.name.endsWith('.template.js'))) {
                let file = {
                    path: path,
                    pathParts: path.replace(config.srcDir, '').split('/').filter((s) => s !== ''),
                    file: info.name,
                    fileName: info.name.replace('.template.js', ''),
                    type: 'content',
                    ext: ext
                };

                if (path.indexOf('_layouts') > 0) {
                    file.type = 'layout';
                } else if (path.indexOf('_includes') > 0) {
                    file.type = 'include';
                }

                files.push(file);
            }
        }
    });

    return files;
}

function groupFiles(files) {
    return {
        content: files.filter(f => f.type === 'content'),
        layout: files.filter(f => f.type === 'layout'),
        include: files.filter(f => f.type === 'include')
    }
}

function processPage(pageInfo) {
    const templateData = require(`${root}/${pageInfo.path}/${pageInfo.file}`); 

    const content = {
        fileInfo: pageInfo,
        config: templateData.config,
        render: templateData.render
    }

    if (!content.config) {
        delete content.config;
    }

    if (content.config && content.config.data) {
        if (typeof content.config.data === 'string') {
            content.data = require(`${root}/${config.srcDir}/_data/${content.config.data}.js`); 
        } else if (typeof content.config.data === 'object') {
            content.data = () => content.config.data;
        }
    }

    return content;
}

function getInclude(pageInfo, name) {
    if (name.endsWith('_')) {
        const matchingKeys = pageInfo.includeKeys.filter(key => key.startsWith(name));

        const include = matchingKeys.map(key => {
            return {
                name: key,
                render: pageInfo.include.get(key).render
            }
        });
        
        return include;
    } else {
        const include = pageInfo.include.get(name);
        return include ? [{name: name, render: include.render}] : [];
    }
}

function createPages(pageInfo) {
    pageInfo.content.forEach(page => {
        const layout = page.config.layout;
        let content = '';
        let data = page.data ? page.data() : {};
        let includes = {};
        let layoutIncludes = {};

        // Includes
        if (page.config.include && page.config.include.length > 0) {
            page.config.include.forEach(include => {
                const incs = getInclude(pageInfo, include);

                if (incs) {
                    incs.forEach(inc => includes[inc.name] = inc.render);
                }
            });
        }

        let renderData = page.render(data, includes);

        if (!Array.isArray(renderData)) {
            renderData = [{content: renderData}];
        }

        // Build pages.
        renderData.forEach(renderDataItem => {
            // Create path            
            let currentPath = `${config.destDir}`;

            page.fileInfo.pathParts.forEach(part => {
                currentPath = `${currentPath}/${part}`;

                if (!fs.existsSync(currentPath)) {
                    fs.mkdirSync(currentPath);
                }
            });

            /*
            if (!((page.fileInfo.pathParts.length === 0) && (page.fileInfo.fileName === 'index'))) {
                currentPath = renderDataItem.name ? `${currentPath}/${renderDataItem.name}` : `${currentPath}/${page.fileInfo.fileName}`;
            }
            */
            if (page.fileInfo.fileName !== 'index') {
                currentPath = renderDataItem.name ? `${currentPath}/${renderDataItem.name}` : `${currentPath}/${page.fileInfo.fileName}`;
            }

            if (!fs.existsSync(currentPath)) {
                fs.mkdirSync(currentPath);
            }

            renderDataItem.path = currentPath.replace(config.destDir, '') + '/' || '/';
    
            // Build Page
            if (layout) {
                const layoutPageInfo = pageInfo.layout.get(layout);

                if (layoutPageInfo) {
                    // Layout Includes
                    if (layoutPageInfo.config.include && layoutPageInfo.config.include.length > 0) {
                        layoutPageInfo.config.include.forEach(include => {
                            const incs = getInclude(pageInfo, include);

                            if (incs) {
                                incs.forEach(inc => layoutIncludes[inc.name] = inc.render);
                            }
                        });
                    }

                    content = layoutPageInfo.render({
                        content: renderDataItem.content,
                        title: renderDataItem.title ? renderDataItem.title : page.config.title,
                        path: renderDataItem.path,
                        $: layoutPageInfo.data ? layoutPageInfo.data() : null
                    }, layoutIncludes);
                } else {
                    content = renderDataItem.content;
                }
            }

            // Save page.
            if (content) {
                fs.writeFileSync(`${root}/${currentPath}/index.html`, content);
                console.log(`${currentPath}/index.html was created successfully`);
            } else {
                console.log(`${currentPath}/index.html was not created - there was no content`);
            }
        });
    });
}

function copyAssets() {
    if (config.copy) {
        config.copy.forEach(asset => {
            if (typeof asset === 'string') {
                fs.copySync(`${root}/${asset}`, `${root}/${config.destDir}/${asset}`);
            } else if (typeof asset === 'object') {
                let src = asset.src;
                let dest = asset.dest ? asset.dest : asset.src;
                fs.copySync(`${root}/${src}`, `${root}/${config.destDir}/${dest}`);
            }
        });
    }
}

// START BUILD
console.log('wc-doc build started...');
console.log();

let startTime = process.hrtime();

if (!fs.existsSync(config.destDir)) {
    fs.mkdirSync(config.destDir)
}

const pages = groupFiles(getFiles(config.srcDir));

const layoutMap = new Map();
pages.layout.forEach(item => {
    layoutMap.set(item.fileName, processPage(item));
});

const includeMap = new Map();
pages.include.forEach(item => {
    let key = item.fileName;

    if (item.pathParts.length > 1) {
        key = item.pathParts.slice(1).join('_') + '_' + key;
    }

    includeMap.set(key, processPage(item));
});

const processedPages = {
    content: pages.content.map(pageInfo => processPage(pageInfo)),
    layout: layoutMap,
    include: includeMap,
    includeKeys: Array.from(includeMap.keys())
};


createPages(processedPages);
copyAssets();

let endTime = process.hrtime(startTime);

console.log();
console.log(`wc-doc build complete: ${endTime[0] * 1000 + endTime[1] / 1000000}ms`);
// END BUILD