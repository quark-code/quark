#!/usr/bin/env node

/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
const fs = require('fs-extra');
const root = process.cwd();

interface QuarkConfigAsset {
    src: string;
    dest: string;
}

interface QuarkConfig {
    srcDir: string;
    destDir: string;
    copy?: Array<string> | Array<QuarkConfigAsset>;
}

interface ProcessedPages {
    content: Array<PageContent>;
    layout:  Map<string, PageContent>;
    include:  Map<string, PageContent>;
    includeKeys: Array<string>;
}

interface FilePart {
    path: string;
    pathParts: Array<string>;
    file: string;
    fileName: string;
    type: string;
    ext: string;
}

interface FileGroup {
    content: Array<FilePart>;
    layout: Array<FilePart>;
    include: Array<FilePart>;
}

interface PageContent  {
    fileInfo: FilePart;
    config?: { layout?: string; title?: string; data?: string, include?: Array<string> },
    render: Function,
    data?: any
}

type RenderResult = string | Array<{ title?: string; name?: string; content: string; path?: string}>;

class QuarkCompiler {
    private config: QuarkConfig;

    constructor() {
        this.config = fs.pathExistsSync(root + '/quark-doc.config.js') ? require(root + '/quark-doc.config.js') : {
            srcDir: 'docs_src',
            destDir: 'docs'
        };

        if (!this.config.srcDir) {
            this.config.srcDir = 'docs_src';
        }

        if (!this.config.destDir) {
            this.config.destDir = 'docs';
        }
    }

    build() {
        // START BUILD
        console.log('wc-doc build started...');
        console.log();

        let startTime = process.hrtime();

        if (!fs.existsSync(this.config.destDir)) {
            fs.mkdirSync(this.config.destDir)
        }

        const pages: FileGroup = this.groupFiles(this.getFiles(this.config.srcDir));

        const layoutMap = new Map<string, PageContent>();
        pages.layout.forEach((item: FilePart) => {
            layoutMap.set(item.fileName, this.processPage(item));
        });

        const includeMap = new Map<string, PageContent>();
        pages.include.forEach(item => {
            let key = item.fileName;

            if (item.pathParts.length > 1) {
                key = item.pathParts.slice(1).join('_') + '_' + key;
            }

            includeMap.set(key, this.processPage(item));
        });

        const processedPages: ProcessedPages = {
            content: pages.content.map((pageInfo: FilePart) => this.processPage(pageInfo)),
            layout: layoutMap,
            include: includeMap,
            includeKeys: Array.from(includeMap.keys())
        };


        this.createPages(processedPages);
        this.copyAssets();

        let endTime = process.hrtime(startTime);

        console.log();
        console.log(`wc-doc build complete: ${endTime[0] * 1000 + endTime[1] / 1000000}ms`);
        // END BUILD
    }

    private getFiles(path: string): Array<FilePart> {
        let files = [];
        const fileInfo = fs.readdirSync(path, { withFileTypes: true });

        fileInfo.forEach((info: any) => {
            if (info.isDirectory()) {
                files = [...files, ...this.getFiles(`${path}/${info.name}`)];
            } else {
                const fn = info.name.toLowerCase();
                const ext = fn.substring(fn.lastIndexOf('.') + 1);

                if ((ext === 'js') && (info.name.endsWith('.template.js'))) {
                    let file = {
                        path: path,
                        pathParts: path.replace(this.config.srcDir, '').split('/').filter((s) => s !== ''),
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

    private groupFiles(files: Array<FilePart>): FileGroup {
        const result: FileGroup = {
            content: files.filter(f => f.type === 'content'),
            layout: files.filter(f => f.type === 'layout'),
            include: files.filter(f => f.type === 'include')
        };

        return result;
    }

    private processPage(pageInfo: FilePart): PageContent {
        const templateData = require(`${root}/${pageInfo.path}/${pageInfo.file}`);

        const content: PageContent = {
            fileInfo: pageInfo,
            config: templateData.config,
            render: templateData.render,
            data: null
        }

        if (!content.config) {
            delete content.config;
        }

        if (content.config && content.config.data) {
            if (typeof content.config.data === 'string') {
                content.data = require(`${root}/${this.config.srcDir}/_data/${content.config.data}.js`);
            } else if (typeof content.config.data === 'object') {
                content.data = () => content.config.data;
            }
        }

        return content;
    }

    private getInclude(pageInfo: any, name: string) {
        if (name.endsWith('_')) {
            const matchingKeys = pageInfo.includeKeys.filter((key: string) => key.startsWith(name));

            const include = matchingKeys.map((key: string) => {
                return {
                    name: key,
                    render: pageInfo.include.get(key).render
                }
            });

            return include;
        } else {
            const include = pageInfo.include.get(name);
            return include ? [{ name: name, render: include.render }] : [];
        }
    }

    private createPages(pageInfo: ProcessedPages) {
        pageInfo.content.forEach((page: PageContent) => {
            const layout = page.config.layout;
            let content = '';
            let data = page.data ? page.data() : {};
            let includes = {};
            let layoutIncludes = {};

            // Includes
            if (page.config.include && page.config.include.length > 0) {
                page.config.include.forEach((include: any) => {
                    const incs = this.getInclude(pageInfo, include);

                    if (incs) {
                        incs.forEach((inc: any) => includes[inc.name] = inc.render);
                    }
                });
            }

            let renderData: RenderResult = page.render(data, includes);

            if (!Array.isArray(renderData)) {
                renderData = [{ content: renderData }];
            }

            // Build pages.
            renderData.forEach(renderDataItem => {
                // Create path            
                let currentPath = `${this.config.destDir}`;

                page.fileInfo.pathParts.forEach(part => {
                    currentPath = `${currentPath}/${part}`;

                    if (!fs.existsSync(currentPath)) {
                        fs.mkdirSync(currentPath);
                    }
                });

                if (page.fileInfo.fileName !== 'index') {
                    currentPath = renderDataItem.name ? `${currentPath}/${renderDataItem.name}` : `${currentPath}/${page.fileInfo.fileName}`;
                }

                if (!fs.existsSync(currentPath)) {
                    fs.mkdirSync(currentPath);
                }

                renderDataItem.path = currentPath.replace(this.config.destDir, '') + '/' || '/';

                // Build Page
                if (layout) {
                    const layoutPageInfo = pageInfo.layout.get(layout);

                    if (layoutPageInfo) {
                        // Layout Includes
                        if (layoutPageInfo.config.include && layoutPageInfo.config.include.length > 0) {
                            layoutPageInfo.config.include.forEach(include => {
                                const incs = this.getInclude(pageInfo, include);

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

    private copyAssets() {
        if (this.config.copy) {
            this.config.copy.forEach((asset: string | QuarkConfigAsset) => {
                if (typeof asset === 'string') {
                    fs.copySync(`${root}/${asset}`, `${root}/${this.config.destDir}/${asset}`);
                } else if (typeof asset === 'object') {
                    let src = asset.src;
                    let dest = asset.dest ? asset.dest : asset.src;
                    fs.copySync(`${root}/${src}`, `${root}/${this.config.destDir}/${dest}`);
                }
            });
        }
    }
}

new QuarkCompiler().build();