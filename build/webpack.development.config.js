let WEBPACK_COMMON_CONFIG       = require('./webpack.common.config'),
    CONFIG                      = require('./config'),
    path                        = require('path'),
    resolve                     = path.resolve;

const WEBPACK_DEVELOPMENT_CONFIG = {
    output: {
        filename: "[name].js",
        path: CONFIG.DIST_DIR
    },
    devtool: 'source-map'
};

module.exports = Object.assign(WEBPACK_COMMON_CONFIG, WEBPACK_DEVELOPMENT_CONFIG);