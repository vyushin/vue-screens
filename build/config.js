let     webpack         = require('webpack'),
        resolve         = require('path').resolve;

const   ROOT            = resolve(__dirname, '../'),
        SRC_DIR         = resolve(`${ROOT}/src`),
        DIST_DIR        = resolve(`${ROOT}/dist`),
        DEMO_DIR        = resolve(`${ROOT}/demo`),
        ASSETS_DIR      = resolve(`${SRC_DIR}/assets`);

module.exports = Object.freeze({
    ROOT, SRC_DIR, DIST_DIR, DEMO_DIR, ASSETS_DIR
});