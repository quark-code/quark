(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'enterprise',
        title: 'Base Components Overview'
    }

    const render = (data, include) => html`
    <h1>Base Components Overview</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();