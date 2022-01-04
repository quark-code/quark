(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'material',
        title: 'Material'
    }

    const render = (data, include) => html`
    <h1>Material Site</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();