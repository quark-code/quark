(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'material',
        title: 'Components Overview'
    }

    const render = (data, include) => html`
    <h1>Components Overview</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();