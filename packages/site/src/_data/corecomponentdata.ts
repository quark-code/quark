(function () {
    const { ComponentDataProcessor } = require('../_utils/ComponentDataProcessor');
    const allData = ComponentDataProcessor('core');

    module.exports = () => {
        return allData;
    };
})();