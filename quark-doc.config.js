const sites = ['', 'doc/', 'theme/', 'core/', 'material/', 'enterprise/'];

function addSiteFiles(site) {
    config.copy.push({
        src: `packages/site/src/${site}styles.css`,
        dest: `${site}styles.css`
    });

    config.copy.push({
        src: 'node_modules/prism-themes/themes/prism-vsc-dark-plus.min.css',
        dest: `${site}syntax-highlighter.css`
    });
}

const config = {
    srcDir: 'packages/site/src',
    destDir: 'packages/site/dest',
    copy: []
}

sites.forEach(site => {
    addSiteFiles(site);
});

module.exports = config;