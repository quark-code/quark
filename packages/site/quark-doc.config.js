const sites = ['', 'doc/', 'theme/', 'core/', 'material/'];

function addSiteFiles(site) {
    config.copy.push({
        src: `./src/${site}styles.css`,
        dest: `${site}styles.css`
    });

    config.copy.push({
        src: 'node_modules/prism-themes/themes/prism-vsc-dark-plus.min.css',
        dest: `${site}syntax-highlighter.css`
    });
}

const config = {
    srcDir: 'src',
    destDir: 'dest',
    copy: []
}

sites.forEach(site => {
    addSiteFiles(site);
});

module.exports = config;