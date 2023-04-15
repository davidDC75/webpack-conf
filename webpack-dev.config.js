const path = require('path');
const dev = process.env.NODE_ENV === "dev";

let config = {
    mode: 'development',
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'development.js',
    },
    // Permet d'avoir les fichiers originals avec source-map
    devtool: dev ? "eval-source-map" : false,
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
        ],
    },
};

module.exports = config;

/* Pour générer une seule configuration */

// module.exports = {
//     mode: 'development',
//     entry: './assets/js/app.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'development.js',
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/, // On ne traite que les js
//                 exclude: /(node_modules|bower_components)/, // On exclu ces deux répertoires
//                 use: [ // Ajout de babel-loader
//                     'babel-loader',
//                     {
//                         loader: 'babel-loader',
//                         options: {
//                             presets: [
//                                 ['@babel/preset-env', { targets: "defaults" }]
//                             ]
//                         },
//                     },
//                 ],
//             },
//         ],
//     },
// };

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