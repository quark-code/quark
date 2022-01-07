(function () {
    const { html, read, mdRaw } = require('@quark-elements/doc');

    const config = {
        layout: 'core',
        title: 'Decorators'
    }

    const render = () => {
        const md_data = read('packages/site/src/_content/decorators/overview.md');
        return html`<article class="md-content">${mdRaw(md_data)}</article>`
    };

    module.exports = {
        config: config,
        render: render,
    };
})();