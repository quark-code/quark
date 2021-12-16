const { html } = require('@quark-elements/doc');

const config = {
    layout: 'default',
    title: 'Components',
    data: 'componentdata',
    include: ['demos_', 'samples_']
}

const render = (data, include) => {
    return data.components.map(component => {
        const demoName = `demos_${component.name}`;
        const sampleName = `samples_${component.name}`;

        return {
            title: component.name,
            name: component.name,
            content: html`
                <doc-component-header></doc-component-header>
                <doc-component-tabs>
                    ${include[sampleName] ? html`<div slot="overview">${include[sampleName]()}</div>` : null}
                    ${include[demoName] ? html`<div slot="demos">${include[demoName]()}</div>` : null}
                    
                    <div slot="documentation">API DOCUMENTATION GOES HERE</div>
                </doc-component-tabs>
            `
        }
    });
};

module.exports = {
    config: config,
    render: render,
};