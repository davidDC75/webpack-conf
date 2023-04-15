const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
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
    // Utilisation de TersetPlugin() pour la minimification
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
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
                use: ["style-loader", "css-loader"],
            },
            // Pour compiler et injecter du sass
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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