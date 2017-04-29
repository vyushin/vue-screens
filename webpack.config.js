let     webpack                 = require('webpack'),
        path                    = require('path'),
        resolve                 = path.resolve,
        CopyWebpackPlugin       = require('copy-webpack-plugin');

const   ROOT                    = resolve(__dirname),
        SRC_DIR                 = resolve(`${ROOT}/src`),
        DIST_DIR                = resolve(`${ROOT}/dist`),
        ASSETS_DIR              = resolve(`${SRC_DIR}/assets`),
        NODE_ENV                = 'development';

module.exports = [{
    entry: {
        bundle: resolve(`${SRC_DIR}/index.js`)
    },
    output: {
        filename: "[name].js",
        path: DIST_DIR
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
            include: SRC_DIR,
            use: [{
                loader: 'vue-loader',
                options: {}
            }]
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new CopyWebpackPlugin([
            { from: resolve(`${ASSETS_DIR}/index.html`), to: resolve(`${DIST_DIR}/index.html`) },
            { from: resolve(`${ASSETS_DIR}/style.css`), to: resolve(`${DIST_DIR}/style.css`) },
            { from: resolve(`${ASSETS_DIR}/favicon.ico`), to: resolve(`${DIST_DIR}/favicon.ico`) }
        ])
    ],

    devServer: {
        port: 1841
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            components: resolve(`${SRC_DIR}/components`),
            store: resolve(`${SRC_DIR}/store`),
            plugins: resolve(`${SRC_DIR}/plugins`),
            '@': ROOT
        }
    }
}];