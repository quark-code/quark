(function () {
    const { DecoratorOverviewTemplate } = require('../../_utils/DecoratorOverviewTemplate');
    const { config, render } = DecoratorOverviewTemplate('enterprise');

    module.exports = {
        config: config,
        render: render,
    };
})();