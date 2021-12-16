const { html } = require('@quark-elements/doc');

const config = {
    layout: 'default',
    title: 'Home'
}

const render = (data, include) => html`
    <h1>Home</h1>
`;

module.exports = {
    config: config,
    render: render,
};