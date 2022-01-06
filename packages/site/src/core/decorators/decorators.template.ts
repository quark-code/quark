(function () {
    const { DecoratorTemplate } = require('../../_utils/DecoratorTemplate');
    const { config, render } = DecoratorTemplate('core');

    module.exports = {
        config: config,
        render: render,
    };
})();