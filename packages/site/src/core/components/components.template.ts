(function () {
    const { ComponentTemplate } = require('../../_utils/ComponentTemplate');
    const { config, render } = ComponentTemplate('core');

    module.exports = {
        config: config,
        render: render,
    };
})();