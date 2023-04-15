const path = require('path');
// Pour extraire les css vers un fichier .css
// https://webpack.js.org/plugins/mini-css-extract-plugin#attributes
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Pour minimizer les js
const TerserPlugin = require('terser-webpack-plugin');

// Pour minimizer un css
// https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/* Pour générer une seule configuration */

module.exports = {
    mode: 'production',
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'production.js',
    },
    // Mode watch activé
    watch: true,
    watchOptions: {
        aggregateTimeout: 4000,
    },
    // Pour extraire les css en fichier .css
    // https://webpack.js.org/plugins/mini-css-extract-plugin#attributes
    plugins: [new MiniCssExtractPlugin({
        filename: 'styles.css', // Crée le fichier dans ./dist/styles.css à ajouter à son html
    })],
    // Utilisation de TersetPlugin() pour la minimification
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    // Permet d'avoir un source map quality bundle (voir webpack config devtool)
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/, // On ne traite que les js
                exclude: /(node_modules|bower_components)/, // On exclu ces deux répertoires
                use: [ // Ajout de babel-loader
                    'babel-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: "defaults" }]
                            ]
                        },
                    },
                ],
            },
            // Pour compiler et injecter du css
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            // Pour compiler et injecter du sass
            {
                test: /\.scss$/i,
                use: [ MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
};

/* Pour générer multiple configuration */

// module.exports = [
//     {
//         mode: 'production',
//         output: {
//             path: path.resolve(__dirname, 'dist'),
//             filename: 'production.js',
//             // libraryTarget: 'amd',
//         },
//         // name: 'amd',
//         entry: './assets/js/app.js',
//         watch: true,
//         watchOptions: {
//             aggregateTimeout: 4000,
//         },
//     },
//     {
//         mode: 'development',
//         output: {
//             path: path.resolve(__dirname, 'dist'),
//             filename: 'development.js',
//             // libraryTarget: 'commonjs',
//         },
//         // name: 'commonjs',
//         entry: './assets/js/app.js',
//         watch: true,
//         watchOptions: {
//             aggregateTimeout: 4000,
//         },
//     },
// ]