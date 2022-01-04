(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'doc',
        title: 'Doc'
    }

    const render = (data, include) => html`
    <h1>Doc Site</h1>
`;

    module.exports = {
        config: config,
        render: render,
    };
})();