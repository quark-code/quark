(function () {
    const { DecoratorOverviewTemplate } = require('../../_utils/DecoratorOverviewTemplate');
    const { config, render } = DecoratorOverviewTemplate('material');

    module.exports = {
        config: config,
        render: render,
    };
})();