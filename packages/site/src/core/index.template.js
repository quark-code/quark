const { html } = require('@quark-elements/doc');

const config = {
    layout: 'core',
    title: 'Core'
}

const render = (data, include) => html`
    <h1>Core Site</h1>
`;

module.exports = {
    config: config,
    render: render,
};