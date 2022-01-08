(function () {
    const { DecoratorTemplate } = require('../../_utils/DecoratorTemplate');
    const { config, render } = DecoratorTemplate('enterprise', ['core']);

    module.exports = {
        config: config,
        render: render,
    };
})();