let WEBPACK_COMMON_CONFIG       = require('./webpack.common.config'),
    CONFIG                      = require('./config'),
    path                        = require('path'),
    resolve                     = path.resolve;

const WEBPACK_DEVSERVER_CONFIG = {
    entry: {
        bundle: resolve(`${CONFIG.SRC_DIR}/index.js`)
    },
    output: {
        filename: "[name].js",
        path: CONFIG.DEMO_DIR
    },
    devServer: {
        port: 1841,
        contentBase: CONFIG.DEMO_DIR
    }
};

module.exports = Object.assign(WEBPACK_COMMON_CONFIG, WEBPACK_DEVSERVER_CONFIG);