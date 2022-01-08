(function () {
    const { ComponentDataProcessor } = require('../_utils/ComponentDataProcessor');
    const allData = ComponentDataProcessor('enterprise');

    module.exports = () => {
        return allData;
    };
})();