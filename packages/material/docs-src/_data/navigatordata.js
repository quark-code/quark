const data = require('./componentdata')();

const components = data.components.map(component => {
    return {
        url: `/components/${component.name}/`,
        label: component.displayName,
        category: component.category
    }
});

const categories = [...new Set(components.map(p => p.category))].sort();
const componentPages = [];

categories.forEach(c => {
    componentPages.push({
        label: c,
        pages: components.filter(a => a.category === c)
    });
});

/*
const displayComponents = [
    ...categories,
    ...components
].sort();
*/
//console.log(categories);

module.exports = () => {
    return {
        categories: [
            {
                label: 'Getting Started',
                pages: [
                    {
                        url: '/',
                        label: 'Home'
                    },
                    {
                        url: '/installation/',
                        label: 'Installation'
                    },
                    {
                        url: '/usage/',
                        label: 'Usage'
                    }
                ]
            },
            {
                label: 'Components',
                pages: componentPages
            }
        ]
    };
 };