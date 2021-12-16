let  components = require('../../custom-elements.json');

//components = components.modules.filter(module => !module.path.endsWith('index.js'));

const componentData = {
    components: [],
    designTokens: [],
    cssModules: []
}

components.modules.forEach(m => {
    m.declarations.forEach(d => {
        const type = d.type?.text;

        if (type) {
            switch (type) {
                case 'component': {
                    componentData.components.push({
                        name: d.name,
                        tagName: d.tagName,
                        summary: d.summary
                    });
                    break;
                }

                case 'designtoken': {
                    componentData.designTokens.push(d);
                    break;
                }

                case 'cssmodule': {
                    componentData.cssModules.push(d);
                    break;
                }
            }
        }
    });
});

//console.log(componentData);

module.exports = () => {
    return [
        {
            name: 'Button',
            tagName: 'wc-button',
            summary: 'A regular button component.',
            properties: [
                {
                    summary: 'The text to display on the button.',
                    name: 'caption',
                    type: 'String',
                    defaultValue: 'OK',
                    attribute: 'caption'
                },
            ],
            methods: [
                {
                    summary: 'Clicks the button.',
                    name: 'click',
                    parameters: [
                        {
                            name: 'data',
                            type: 'Object'
                        }
                    ],
                    return: 'void'
                },
            ],
            cssVariables: [
                {
                    summary: 'The background color of the button.',
                    name: '--button-background-color',
                    type: 'color',
                    defaultValue: '#0000FF'
                },
                {
                    summary: 'The foreground color of the button.',
                    name: '--button-foreground-color',
                    type: 'color',
                    defaultValue: '#FFFFFF'
                }
            ]
        },
        {
            name: 'Checkbox',
            tagName: 'wc-checkbox',
            summary: 'A regular checkbox component.',
            properties: [
                {
                    summary: 'The text to display on the checkbox.',
                    name: 'caption',
                    type: 'String',
                    defaultValue: '',
                    attribute: 'caption'
                },
                {
                    summary: 'Whether or not the checkbox is checked.',
                    name: 'checked',
                    type: 'Boolean',
                    defaultValue: 'false',
                    attribute: 'checked'
                },
            ],
            methods: [
                {
                    summary: 'Clicks the checkbox.',
                    name: 'click',
                    parameters: [
                        {
                            name: 'data',
                            type: 'Object'
                        }
                    ],
                    return: 'void'
                },
                {
                    summary: 'Toggles the check state.',
                    name: 'toggle',
                    parameters: [],
                    return: 'Boolean'
                },
            ],
            cssVariables: [
                {
                    summary: 'The background color of the checkbox.',
                    name: '--checkbox-background-color',
                    type: 'color',
                    defaultValue: '#00FF00'
                },
                {
                    summary: 'The foreground color of the checkbox.',
                    name: '--checkbox-foreground-color',
                    type: 'color',
                    defaultValue: '#FFFFFF'
                },
                {
                    summary: 'The text color of the checkbox.',
                    name: '--checkbox-text-color',
                    type: 'color',
                    defaultValue: '#000000'
                }
            ]
        },
        {
            name: 'Label',
            tagName: 'wc-label',
            summary: 'A regular label component.',
            properties: [
                {
                    summary: 'The text to display on the label.',
                    name: 'caption',
                    type: 'String',
                    defaultValue: '',
                    attribute: 'caption'
                },
            ],
            methods: [],
            cssVariables: [
                {
                    summary: 'The background color of the label.',
                    name: '--label-background-color',
                    type: 'color',
                    defaultValue: '#0000FF'
                },
                {
                    summary: 'The foreground color of the label.',
                    name: '--label-foreground-color',
                    type: 'color',
                    defaultValue: '#FFFFFF'
                }
            ]
        }
    ]
};