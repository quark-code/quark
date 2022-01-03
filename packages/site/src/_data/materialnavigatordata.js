const data = require('./materialcomponentdata')();

function _sortPages(a, b) {
    var nameA = a.label.toUpperCase();
    var nameB = b.label.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }

    if (nameA > nameB) {
        return 1;
    }

    return 0;
};

/* COMPONENTS */
const components = data.components.map(component => {
    return {
        url: `/material/components/${component.name}/`,
        label: component.displayName,
        category: component.category,
        designSystem: component.designSystem
    }
});

const componentCategories = [...new Set(components.map(p => p.category))].filter(c => c !== null).sort();
const componentPages = [];

componentCategories.forEach(c => {
    componentPages.push({
        label: c,
        items: components.filter(a => a.category === c).sort(_sortPages)
    });
});

components.filter(a => a.category === null).forEach(c => {
    componentPages.push(c);
});

componentPages.sort(_sortPages);

/* BASE COMPONENTS */
const baseComponents = data.baseComponents.map(component => {
    return {
        url: `/material/components/${component.name}/`,
        label: component.displayName,
        category: component.category,
        designSystem: component.designSystem
    }
});

const baseComponentCategories = [...new Set(baseComponents.map(p => p.category))].filter(c => c !== null).sort();
const baseComponentPages = [];

baseComponentCategories.forEach(c => {
    baseComponentPages.push({
        label: c,
        items: baseComponents.filter(a => a.category === c).sort(_sortPages)
    });
});

baseComponents.filter(a => a.category === null).forEach(c => {
    baseComponentPages.push(c);
});

baseComponentPages.sort(_sortPages);

module.exports = () => {
    return [
        {
            label: 'Getting Started',
            items: [
                {
                    url: '/material/',
                    label: 'Overview'
                },
                {
                    url: '/material/installation/',
                    label: 'Installation'
                },
                {
                    url: '/material/usage/',
                    label: 'Usage'
                },
                {
                    url: '/material/theming/',
                    label: 'Theming'
                }
            ]
        },
        {
            label: 'Components',
            items: componentPages
        },
        {
            label: 'Base Components',
            items: baseComponentPages
        },
        {
            label: 'Mixins',
            items: [
                {
                    url: '/material/mixins/',
                    label: 'Overview'
                }
            ]
        },
        {
            label: 'Controllers',
            items: [
                {
                    url: '/material/controllers/',
                    label: 'Overview'
                }
            ]
        },
        {
            label: 'Styles',
            items: [
                {
                    url: '/material/styles/',
                    label: 'Overview'
                }
            ]
        }
    ];
}