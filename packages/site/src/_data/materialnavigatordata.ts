(function () {
    const baseName = 'material';
    const { ComponentNavigatorProcessor } = require('../_utils/ComponentDataProcessor');
    const { componentPages, baseComponentPages, decoratorPages } = ComponentNavigatorProcessor(baseName);

    module.exports = () => {
        return [
            {
                label: 'Getting Started',
                items: [
                    {
                        url: `/${baseName}/`,
                        label: 'Overview'
                    },
                    {
                        url: `/${baseName}/installation/`,
                        label: 'Installation'
                    },
                    {
                        url: `/${baseName}/usage/`,
                        label: 'Usage'
                    },
                    {
                        url: `/${baseName}/theming/`,
                        label: 'Theming'
                    }
                ]
            },
            {
                label: 'Components',
                items: [{
                    url: `/${baseName}/components/components-overview/`,
                    label: 'Overview'
                }, ...componentPages]
            },
            {
                label: 'Base Components',
                items: [{
                    url: `/${baseName}/components/base-components-overview/`,
                    label: 'Overview'
                }, ...baseComponentPages]
            },
            {
                label: 'Mixins',
                items: [
                    {
                        url: `/${baseName}/mixins/`,
                        label: 'Overview'
                    }
                ]
            },
            {
                label: 'Controllers',
                items: [
                    {
                        url: `/${baseName}/controllers/`,
                        label: 'Overview'
                    }
                ]
            },
            {
                label: 'Decorators',
                items: [{
                    url: `/${baseName}/decorators/`,
                    label: 'Overview'
                }, ...decoratorPages]
            },
            {
                label: 'Styles',
                items: [
                    {
                        url: `/${baseName}/styles/`,
                        label: 'Overview'
                    }
                ]
            }
        ];
    }
})();