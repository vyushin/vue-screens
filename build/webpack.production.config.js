let WEBPACK_COMMON_CONFIG       = require('./webpack.common.config'),
    CONFIG                      = require('./config');

const WEBPACK_PRODUCTION_CONFIG = {
    output: {
        filename: "[name].js",
        library: 'VueScreens',
        libraryTarget: 'umd',
        path: CONFIG.DIST_DIR
    }
};

module.exports = Object.assign(WEBPACK_COMMON_CONFIG, WEBPACK_PRODUCTION_CONFIG);