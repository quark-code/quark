let components = require('../../manifests/material/custom-elements.json');

const allData = {
    components: [],
    baseComponents: [],
    designTokens: [],
    cssModules: [],
    themes: []
}

function _sort(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }

    if (nameA > nameB) {
        return 1;
    }

    return 0;
};

function _getSuperclass(component, coreOnly) {
    let sc = null;

    if (component.superclass && component.superclass.name !== 'LitElement') {
        if (coreOnly) {
            sc = allData.baseComponents.find(c => component.superclass.name === c.name);
        } else {
            sc = allData.components.find(c => component.superclass.name === c.name);

            if (!sc) {
                sc = allData.baseComponents.find(c => component.superclass.name === c.name);
            }
        }
    }

    return sc;
}

function _mergeSlots(component, coreOnly) {
    component.slots = component.slots ?? [];
    let slots = [...component.slots];

    if ((component.superclass) && (component.superclass.name !== 'LitElement')) {
        const superclass = _getSuperclass(component, coreOnly);
        const baseSlots = _mergeSlots(superclass, coreOnly);
        slots = [...slots, ...baseSlots];
    }

    return slots;
};

function _patchAttributes(items) {
    items.forEach(item => {
        item.attributes.forEach(attr => {
            const prop = item.properties.find(p => attr.fieldName === p.name);

            if (prop) {
                attr.default = prop.default;
            }
        });
    });
}

components.modules.forEach(m => {
    m.declarations.filter(d => (d.kind === 'class') || d.kind === 'mixin' || d.kind === 'controller').forEach(d => {
        //const members = d.members ? d.members.filter(m => !m.name.startsWith('_')).sort(_sort) : [];
        const members = d.members ? d.members.sort(_sort) : [];
        members.forEach(m => m.protected = m.name.startsWith('_'));

        const attributes = d.attributes ? d.attributes.filter(m => !m.name.startsWith('_') && !m.readonly).sort(_sort) : [];
        const type = d.type?.text;

        if (type) {
            switch (type) {
                case 'component': {
                    const component = {
                        name: d.name,
                        displayName: d.displayname,
                        designSystem: d.designSystem ? d.designSystem : null,
                        category: d.category ?? null,
                        superclass: d.superclass ? d.superclass : null,
                        tagName: d.tagName,
                        summary: d.summary,
                        cssProperties: d.cssProperties ? d.cssProperties.sort(_sort) : [],
                        cssParts: d.cssParts ? d.cssParts.sort(_sort) : [],
                        slots: d.slots ? d.slots.sort(_sort) : [],
                        events: d.events ? d.events.sort(_sort) : [],
                        attributes: attributes,
                        properties: members ? members.filter(m => (m.kind === 'field' && !m.static)).map(m => {
                            return { 
                                name: m.name, 
                                description: m.description,
                                type: m.type, 
                                attribute: m.attribute,
                                default: m.default,
                                inheritedFrom: m.inheritedFrom,
                                allowedValues: m.allowedvalues,
                                protected: m.protected,
                                readonly: m.readonly
                            };
                        }) : [],
                        methods: members ? members.filter(m => (m.kind === 'method' && !m.static)).map(m => {
                            return { 
                                name: m.name, 
                                description: m.description, 
                                parameters: m.parameters, 
                                return : m.return,
                                inheritedFrom: m.inheritedFrom,
                                protected: m.protected
                            };
                        }) : []
                    }

                    if (component.tagName) {
                        allData.components.push(component);
                    } else {
                        delete component.tagName;
                        allData.baseComponents.push(component);
                    }
                    
                    break;
                }

                case 'designtoken': {
                    allData.designTokens.push(d);
                    break;
                }

                case 'cssmodule': {
                    allData.cssModules.push(d);
                    break;
                }

                case 'theme': {
                    allData.themes.push(d);
                    break;
                }
            }
        }
    });
});

// Merge inherited slots.
allData.baseComponents.forEach(c => {
    c.slots = _mergeSlots(c, true);
});

allData.components.forEach(c => {
    c.slots = _mergeSlots(c, false);
});

// Patch attributes.
_patchAttributes(allData.baseComponents);
_patchAttributes(allData.components);

module.exports = () => {
    return allData;
};