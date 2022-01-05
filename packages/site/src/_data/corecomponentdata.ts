(function () {
    const { ComponentDataProcessor } = require('./ComponentDataProcessor');
    const allData = ComponentDataProcessor('core');

    module.exports = () => {
        return allData;
    };
})();