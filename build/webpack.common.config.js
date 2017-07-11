let     webpack                 = require('webpack'),
        path                    = require('path'),
        resolve                 = path.resolve,
        CopyWebpackPlugin       = require('copy-webpack-plugin'),
        isProduction            = () => (process.env.NODE_ENV === 'production');

const   CONFIG                  = require('./config');

console.log(`Build mode ${process.env.NODE_ENV}`);

module.exports = {
    entry: {
        'vue-screens': resolve(`${CONFIG.SRC_DIR}/plugins/VueScreens/index.js`),
        '../demo/bundle': resolve(`${CONFIG.SRC_DIR}/index.js`)
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['latest']
                }
            }]
        }, {
            test: /\.vue$/,
            include: CONFIG.SRC_DIR,
            use: [{
                loader: 'vue-loader',
                options: {}
            }]
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new CopyWebpackPlugin([
            { from: resolve(`${CONFIG.ASSETS_DIR}/index.html`), to: resolve(`${CONFIG.DEMO_DIR}/index.html`) },
            { from: resolve(`${CONFIG.ASSETS_DIR}/style.css`), to: resolve(`${CONFIG.DEMO_DIR}/style.css`) },
            { from: resolve(`${CONFIG.ASSETS_DIR}/favicon.ico`), to: resolve(`${CONFIG.DEMO_DIR}/favicon.ico`) },
            { from: resolve(`${CONFIG.SRC_DIR}/plugins`), to: CONFIG.DIST_DIR }
        ])
    ],

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '#components': resolve(`${CONFIG.SRC_DIR}/components`),
            '#store': resolve(`${CONFIG.SRC_DIR}/store`),
            '#plugins': resolve(`${CONFIG.SRC_DIR}/plugins`),
            vsroot: resolve(`${CONFIG.SRC_DIR}/plugins/VueScreens`)
        }
    }
};