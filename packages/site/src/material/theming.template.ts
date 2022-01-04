(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'material',
        title: 'Theming'
    }

    const render = (data, include) => html`
    <h1>Theming</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();