(function () {
    const { ComponentTemplate } = require('../../_utils/ComponentTemplate');
    const { config, render } = ComponentTemplate('material');

    module.exports = {
        config: config,
        render: render,
    };
})();