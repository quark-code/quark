(function () {
    const { ComponentTemplate } = require('../../_utils/ComponentTemplate');
    const { config, render } = ComponentTemplate('material', ['core']);

    module.exports = {
        config: config,
        render: render,
    };
})();