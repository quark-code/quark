(function () {
    const { DecoratorTemplate } = require('../../_utils/DecoratorTemplate');
    const { config, render } = DecoratorTemplate('material', ['core']);

    module.exports = {
        config: config,
        render: render,
    };
})();