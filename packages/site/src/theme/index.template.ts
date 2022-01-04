(function () {
    const fs = require('fs');
    const { html, mdRaw } = require('@quark-elements/doc');

    let md_data = null;

    try {
        md_data = fs.readFileSync('packages/theme/README.md', 'utf8');
    } catch (err) {
        console.log(err)
    }

    const config = {
        layout: 'theme',
        title: 'Overview'
    }

    const render = (data, include) => {
        return html`<article class="md-content">${mdRaw(md_data)}</article>`;
    };

    module.exports = {
        config: config,
        render: render,
    };
})();