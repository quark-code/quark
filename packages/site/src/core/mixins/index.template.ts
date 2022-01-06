(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'core',
        title: 'Mixins'
    }

    const render = (data, include) => html`
    <h1>Mixins</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();