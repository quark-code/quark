function ComponentTemplate(baseName: string) {
    const { html, escape } = require('@quark-elements/doc');

    const config = {
        layout: baseName,
        title: 'Components',
        data: `${baseName}componentdata`,
        include: [`${baseName}_demos_`, `${baseName}_samples_`]
    }

    function buildCssPropertyValue(val) {
        val = escape(val);
        return val ? val : '(no default)';
    }

    function buildMethodParameters(val) {
        if (val) {
            return `(${val.map(item => `${item.name}${item.type ? `: ${item.type.text}` : ''}`).join(', ')})`;
        }

        return '()';
    }

    function buildMethodReturn(val) {
        return val ? val.type.text : 'void';
    }

    function buildMethodPart(item) {
        return html`
            <component-part caption="${escape(item.name)}" detail="${buildMethodParameters(item.parameters)}: ${buildMethodReturn(item.return)}" 
                            description="${escape(item.description)}" ${getSuperclassDetail(item)}}>
            </component-part>
        `;
    }

    function buildPropertyPart(item) {
        let detail = '';

        if (item.type) {
            detail = escape(item.type.text);

            if (item.default) {
                detail += ` | ${escape(item.default)}`
            }

            if (item.allowedValues && item.allowedValues.length > 0) {
                detail += ` (${item.allowedValues.map(i => `'${i}'`).join(', ')})`;
            } else if (item.allowedValues && item.allowedValues.length > 0) {
                detail += ` (${item.allowedValues.map(i => `'${i}'`).join(', ')})`;
            }
        }

        return html`
            <component-part caption="${escape(item.name)}:&nbsp;" detail="${detail}" description="${escape(item.description)}" 
                                     ${getSuperclassDetail(item)} ${item.readonly ? 'readonly' : ''}>
            </component-part>
        `;
    }

    function buildAttributePart(item) {
        let detail = '';

        if (item.type) {
            detail = escape(item.type.text);

            if (item.default) {
                detail += ` | ${escape(item.default)}`
            }

            if (item.allowedvalues && item.allowedvalues.length > 0) {
                detail += ` (${item.allowedvalues.map(i => `'${i}'`).join(', ')})`;
            } else if (item.allowedValues && item.allowedValues.length > 0) {
                detail += ` (${item.allowedValues.map(i => `'${i}'`).join(', ')})`;
            }
        }

        return html`
            <component-part caption="${escape(item.name)}:&nbsp;" detail="${detail}" description="${escape(item.description)}" 
                                     ${getSuperclassDetail(item)}>
            </component-part>
        `;
    }

    function getSuperclassDetail(item) {
        if (item.inheritedFrom) {
            return `superclass="${item.inheritedFrom.name}" superclass-url="/${baseName}/components/${item.inheritedFrom.name}/"`;
        }

        return '';
    }

    const render = (data, include) => {
        const allComponents = [...data.baseComponents, ...data.components];

        return allComponents.map(component => {
            const demoName = `${baseName}_demos_${component.name}`;
            const sampleName = `${baseName}_samples_${component.name}`;
            const hasSuperclassUrl = component.superclass && component.superclass.name && component.superclass.name !== 'LitElement';
            const superclassUrl = hasSuperclassUrl ? `/${baseName}/components/${component.superclass.name}/` : '';

            const protectedPropertyCount = (component.properties && component.properties.length) ? component.properties.filter(i => i.protected).length : 0;
            const protectedMethodCount = (component.methods && component.methods.length) ? component.methods.filter(i => i.protected).length : 0;

            return {
                title: component.name,
                name: component.name,
                content: html`
                    <component-header display-name="${component.displayName}" component-name="${component.name}" tag="${component.tagName}"
                                      superclass="${component.superclass ? component.superclass.name : ''}" superclass-url="${superclassUrl}" 
                                      superclass-package="${component.superclass ? component.superclass.package : ''}" superclass-package-url=""
                                      summary="${component.summary}">
                    </component-header>
                    <page-tabs selected-index="0">
                        <page-tab label="Overview">${include[sampleName] ? include[sampleName]() : 'No overview yet'}</page-tab>
                        <page-tab label="Demos">${include[demoName] ? include[demoName]() : 'No demo yet'}</page-tab>
    
                        <page-tab label="Documentation">
                            ${component.attributes && component.attributes.length > 0 ? html`
                                <collapsible-panel label="Attributes" persist-key="${component.name}_attributes">
                                    ${component.attributes.map(item => html`
                                        ${buildAttributePart(item)}
                                    `)}
                                </collapsible-panel>
                            `: null}
    
                            ${component.properties && component.properties.length > 0 ? html`
                                <collapsible-panel label="Properties" persist-key="${component.name}_properties">
                                    ${component.properties.filter(item => !item.protected).map(item => html`
                                        ${buildPropertyPart(item)}
                                    `)}
    
                                    ${protectedPropertyCount > 0 ? html`
                                        <collapsible-protected-panel persist-key="${component.name}_properties_protected" collapsed label-open="${protectedPropertyCount === 1 ? 'Hide 1 protected property' : `Hide ${protectedPropertyCount} protected properties`}" 
                                                                     label-closed="${protectedPropertyCount === 1 ? 'Show 1 protected property' : `Show ${protectedPropertyCount} protected properties`}">
                                            ${component.properties.filter(item => item.protected).map(item => html`
                                                ${buildPropertyPart(item)}
                                            `)}
                                        </collapsible-protected-panel>
                                    ` : null}
                                </collapsible-panel>
                            `: null}
                                
                            ${component.methods && component.methods.length > 0 ? html`
                                <collapsible-panel label="Methods" persist-key="${component.name}_methods">
                                    ${component.methods.filter(item => !item.protected).map(item => html` 
                                        ${buildMethodPart(item)} 
                                    `)}      
    
                                    ${protectedMethodCount > 0 ? html`
                                        <collapsible-protected-panel persist-key="${component.name}_methods_protected" collapsed label-open="${protectedMethodCount === 1 ? 'Hide 1 protected method' : `Hide ${protectedMethodCount} protected methods`}" 
                                                                     label-closed="${protectedMethodCount === 1 ? 'Show 1 protected method' : `Show ${protectedMethodCount} protected methods`}">
                                            ${component.methods.filter(item => item.protected).map(item => html`
                                                ${buildMethodPart(item)} 
                                            `)}
                                        </collapsible-protected-panel>
                                    ` : null}
                                </collapsible-panel>
                            `: null}
    
                            ${component.events && component.events.length > 0 ? html`
                                <collapsible-panel label="Events" persist-key="${component.name}_events">
                                    ${component.events.map(item => html`
                                        <component-part caption="${escape(item.name)}" detail="${item.type ? escape(item.type.text) : null}" description="${escape(item.description)}" 
                                                        ${getSuperclassDetail(item)}>
                                        </component-part>
                                    `)}        
                                </collapsible-panel>
                            `: null}
    
                            ${component.slots && component.slots.length > 0 ? html`
                                <collapsible-panel label="Slots" persist-key="${component.name}_slots">
                                    ${component.slots.map(item => html`
                                        <component-part caption="${item.name ? escape(item.name) : '(default)'}" description="${escape(item.description)}"></component-part>
                                    `)}        
                                </collapsible-panel>
                            `: null}
    
                            ${component.cssProperties && component.cssProperties.length > 0 ? html`
                                <collapsible-panel label="CSS Properties" persist-key="${component.name}_css_properties">
                                    ${component.cssProperties.map(item => html`
                                        <component-part caption="${escape(item.name)}:&nbsp;" detail="${buildCssPropertyValue(item.default)}" description="${escape(item.description)}"></component-part>
                                    `)}        
                                </collapsible-panel>
                            `: null}
    
                            ${component.cssParts && component.cssParts.length > 0 ? html`
                                <collapsible-panel label="CSS Parts" persist-key="${component.name}_css_parts">
                                    ${component.cssParts.map(item => html`
                                        <component-part caption="${escape(item.name)}" description="${escape(item.description)}"></component-part>
                                    `)}        
                                </collapsible-panel>
                            `: null}
                        </page-tab>
                    </page-tabs>
                `
            }
        });
    }

    return {
        config,
        render
    }
}

module.exports = {
    ComponentTemplate
}