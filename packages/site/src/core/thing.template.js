const { html } = require('@quark-elements/doc');

const config = {
    layout: 'core',
    title: 'Thing'
}

const render = (data, include) => html`
    <h1>Thing</h1>
`;

module.exports = {
    config: config,
    render: render,
};