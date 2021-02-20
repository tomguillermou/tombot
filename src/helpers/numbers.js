const config = require('../config.json');

module.exports = {
    format,
};

function format(number) {
    return new Intl.NumberFormat(config.lang).format(number);
}
