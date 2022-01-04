(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'theme',
        title: 'Usage'
    }

    const render = (data, include) => html`
    <h1>Usage</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();