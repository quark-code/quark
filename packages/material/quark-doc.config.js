const config = {
    srcDir: 'docs-src',
    destDir: 'docs',
    copy: [
        {
            src: './docs-src/styles/styles.css',
            dest: 'styles.css'
        },
        {
            src: 'node_modules/prism-themes/themes/prism-vsc-dark-plus.min.css',
            dest: 'syntax-highlighter.css'
        }
    ]
}

module.exports = config;