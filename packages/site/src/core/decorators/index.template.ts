(function () {
    const { DecoratorOverviewTemplate } = require('../../_utils/DecoratorOverviewTemplate.js');
    const { config, render } = DecoratorOverviewTemplate('core');

    module.exports = {
        config: config,
        render: render,
    };
})();