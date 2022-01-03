const { html } = require('@quark-elements/doc');

const config = {
    layout: 'material',
    title: 'Controllers'
}

const render = (data, include) => html`
    <h1>Controllers</h1>
`;

module.exports = {
    config: config,
    render: render,
};