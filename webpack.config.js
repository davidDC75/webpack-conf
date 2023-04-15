const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Pour générer une seule configuration */

module.exports = {
    mode: 'development', // Choisir le mode : development ou production
    entry: './assets/js/app.js', // L'entry
    output: {
        path: path.resolve(__dirname, 'dist'), // Le chemin absolue du répertoire de destination
        filename: 'development.js', // Le nom du fichier de sortie
    },
    // Pour activer le watch
    watch: true,
    watchOptions: {
        aggregateTimeout: 4000,
    },
    // Pour extraire les css en fichier .css
    // https://webpack.js.org/plugins/mini-css-extract-plugin#attributes
    plugins: [new MiniCssExtractPlugin({
        filename: 'styles.css', // Crée le fichier dans ./dist/styles.css à ajouter à son html
    })],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: { // Ajout de babel-loader
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // ['@babel/preset-env', { targets: "> 0.25%, not dead" }]
                            ['@babel/preset-env', {
                                targets: {
                                    // On choisit la compatibilité avec certains navigateurs
                                    "browsers": ["last 2 versions","safari >=7", "ie >=7"]
                                }
                            }]
                        ]
                    },

                },
            },
            // Pour compiler et injecter du css
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader'],
            },
            // Pour compiler et injecter du sass
            {
                test: /\.scss$/i,
                use: [ MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
};

/* Ancien babel loader */

// module.exports = {
//     mode: 'development', // Choisir le mode : development ou production
//     entry: './assets/js/app.js', // L'entry
//     output: {
//         path: path.resolve(__dirname, 'dist'), // Le chemin absolue du répertoire de destination
//         filename: 'development.js', // Le nom du fichier de sortie
//     },
//     watch: true,
//     watchOptions: {
//         aggregateTimeout: 4000,
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.js$/,
//                 exclude: /(node_modules|bower_components)/,
//                 // use: ['babel-loader']
//                 use: [ // Ajout de babel-loader
//                     'babel-loader',
//                     {
//                         loader: 'babel-loader',
//                         options: {
//                             presets: [
//                                 // ['@babel/preset-env', { targets: "> 0.25%, not dead" }]
//                                 ['@babel/preset-env', {
//                                     targets: {
//                                         // On choisit la compatibilité avec certains navigateurs
//                                         "browsers": ["last 2 versions","safari >=7", "ie >=7"]
//                                     }
//                                 }]
//                             ]
//                         },
//                     },
//                 ],
//             }
//         ]
//     }
// };

/* Pour générer multiple configuration */

// module.exports = [
//     {
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
//         mode: 'production',
//     },
//     {
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
//         mode: 'development',
//     },
// ]