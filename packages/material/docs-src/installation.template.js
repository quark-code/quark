const { html, md, code } = require('@quark-elements/doc');

const config = {
    layout: 'default',
    title: 'Installation'
}

const render = (data, include) => html`
    <h1>Installation</h1>
`;

module.exports = {
    config: config,
    render: render,
};