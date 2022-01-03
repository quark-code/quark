const { html } = require('@quark-elements/doc');

const config = {
    layout: 'theme',
    title: 'Installation'
}

const render = (data, include) => html`
    <h1>Installation</h1>
`;

module.exports = {
    config: config,
    render: render,
};