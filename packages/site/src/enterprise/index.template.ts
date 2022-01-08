(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'enterprise',
        title: 'Enterprise'
    }

    const render = (data, include) => html`
    <h1>Enterprise Site</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();