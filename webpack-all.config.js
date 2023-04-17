// Le comportement de ce script change selon que dev est présent ou pas

const path = require('path');
const { webpack } = require('webpack');


const dev = process.env.NODE_ENV === "dev";
// Pour extraire les css vers un fichier .css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Pour générer une seule configuration */

// Pour minimizer les js
const TerserPlugin = require('terser-webpack-plugin');

// Pour minimizer un css
// https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// https://www.npmjs.com/package/webpack-manifest-plugin
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

// https://www.npmjs.com/package/simple-progress-webpack-plugin
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

// https://www.npmjs.com/package/clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let config = {
    mode: dev?'development':'production', // Choisir le mode : development ou production
    entry: './assets/js/app.js', // L'entry
    output: {
        path: path.resolve(__dirname, dev?'dist/dev':'dist/prod'), // Le chemin absolue du répertoire de destination
        filename: dev?'[name]-[chunkhash].js':'[name].js',
        //filename: 'development.js', // Le nom du fichier de sortie
    },
    // Pour activer le watch
    // watch: true,
    // watchOptions: {
    //     aggregateTimeout: 4000,
    // },

    // Pour extraire les css en fichier .css
    // https://webpack.js.org/plugins/mini-css-extract-plugin#filename
    // plugins: [new MiniCssExtractPlugin({
    //     filename: 'styles_dev.css', // Crée le fichier dans ./dist/styles.css à ajouter à son html
    // })],
    // Permet d'avoir les fichiers originals avec source-map
    plugins: [
        new SimpleProgressWebpackPlugin(),
        // Les autres plugins sont injectés dynamiquement à la fin
    ],
    devtool: dev ? "eval-source-map" : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                { // Ajout de babel-loader
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // ['@babel/preset-env', { targets: "> 0.25%, not dead" }]
                            // ['@babel/preset-env', { targets: "defaults" }]
                            /* On ne spécifie pas de targets car on utilise .browserslistrc */
                            ['@babel/preset-env', {}]
                            // ['@babel/preset-env', {
                            //     targets: {
                            //         // On choisit la compatibilité avec certains navigateurs
                            //         "browsers": ["last 2 versions","safari >=7", "ie >=7"]
                            //     }
                            // }]
                        ]
                    },

                }],
            },
            // Pour compiler et injecter du css
            {
                test: /\.css$/i,
                /* pour le dev, on utilise plutôt de 'style-loader' */
                use: [
                    dev?'style-loader':MiniCssExtractPlugin.loader,
                    'css-loader',
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         sourceMap: true,
                    //     },
                    // },
                    'postcss-loader'
                ],
                //use: [ MiniCssExtractPlugin.loader, 'css-loader'],

                /* Pour ajoute une source map mais c'est plutôt devtool qu'il faut utiliser par defaut */
                /* https://github.com/webpack-contrib/css-loader#sourcemap */
                // use: [
                //     MiniCssExtractPlugin.loader,
                //     {
                //       loader: "css-loader",
                //       options: {
                //         sourceMap: true,
                //       },
                //     },
                // ],
            },
            // Pour compiler et injecter du sass
            {
                test: /\.scss$/i,
                use: [
                    dev?'style-loader':MiniCssExtractPlugin.loader,
                    'css-loader',
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         sourceMap: true
                    //     }
                    // },
                    'postcss-loader',
                    'sass-loader'
                ],
                //use: [ MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader', 'sass-loader'],
            },
        ],
    },
};

if (!dev) {
    config.plugins.push(new MiniCssExtractPlugin({
        filename: '[name].css',
    }));
    config.plugins.push(new CleanWebpackPlugin({
        verbose: true,
        dry: true,
    }));

    optimization= {
        optimization:
        {
            minimize: true,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        }
    }
    config=Object.assign(config,optimization);

} else {
    config.plugins.push(new WebpackManifestPlugin({
        basePath: '',
        publicPath: '',
    }));

    watch = {
        watch: true,
        watchOptions: {
            aggregateTimeout: 4000,
        }
    }
    config=Object.assign(config,watch);

}

module.exports = config;
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