(function () {
    const { ComponentTemplate } = require('../../_utils/ComponentTemplate');
    const { config, render } = ComponentTemplate('enterprise', ['core']);

    module.exports = {
        config: config,
        render: render,
    };
})();