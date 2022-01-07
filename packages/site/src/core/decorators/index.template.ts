(function () {
    const { DecoratorOverviewTemplate } = require('../../_utils/DecoratorOverviewTemplate');
    const { config, render } = DecoratorOverviewTemplate('core');

    module.exports = {
        config: config,
        render: render,
    };
})();