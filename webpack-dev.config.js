const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dev = process.env.NODE_ENV === "dev";

let config = {
    mode: 'development',
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist/dev'),
        filename: 'development.js',
    },
    // Pour extraire les css en fichier .css
   // https://webpack.js.org/plugins/mini-css-extract-plugin#attributes
    plugins: [new MiniCssExtractPlugin({
        filename: 'styles_dev.css', // Crée le fichier dans ./dist/styles.css à ajouter à son html
    })],
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
            // Pour compiler et injecter du css
            {
                test: /\.css$/i,
                /* pour le dev, on utilise plutôt de 'style-loader' */
                use: ['style-loader','css-loader','postcss-loader'],
                //use: [ MiniCssExtractPlugin.loader, 'css-loader'],
            },
            // Pour compiler et injecter du sass
            {
                test: /\.scss$/i,
                use: [ 'style-loader','css-loader', 'postcss-loader', 'sass-loader'],
                //use: [ MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
    /* Ce code pour importer un plug in pour le lazy loading ne fonctionne pas
     mais on a déjà une méthode qui fonctionne dans app.js
     à creuser */
    // plugins: [
    //     "@babel/plugin-syntax-dynamic-import"
    // ],
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