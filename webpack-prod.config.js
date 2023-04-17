const path = require('path');
const { webpack } = require('webpack');

// Pour extraire les css vers un fichier .css
// https://webpack.js.org/plugins/mini-css-extract-plugin#attributes
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Pour minimizer les js
const TerserPlugin = require('terser-webpack-plugin');

// Pour minimizer un css
// https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// https://www.npmjs.com/package/clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


// https://www.npmjs.com/package/simple-progress-webpack-plugin
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

/* Pour générer une seule configuration */

let config = {
    mode: 'production', // Choisir le mode : development ou production
    entry: './assets/js/app.js', // L'entry
    output: {
        // https://webpack.js.org/configuration/output/
        path: path.resolve(__dirname, 'dist/prod'), // Le chemin absolue du répertoire de destination
        filename: '[name].js', // Le nom du fichier de sortie avec un hash
        // filename: 'production.js',
    },
    // Utilisation de TersetPlugin() pour la minimification
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    // Pour extraire les css en fichier .css
    // https://webpack.js.org/plugins/mini-css-extract-plugin#attributes
    // https://www.npmjs.com/package/webpack-manifest-plugin
    plugins: [
        new SimpleProgressWebpackPlugin(),
        new MiniCssExtractPlugin({
            // filename: 'home-[chunkhash]-production.css', // Crée le fichier dans ./dist/styles.css à ajouter à son html
            filename: '[name].css',
        }),
        // new CleanWebpackPlugin({
        //     verbose: true,
        // }),
        /* Ne semble pas fonctionner mais ne donne pas d'erreur */
        new CleanWebpackPlugin({
            //root: path.resolve('./dist/prod'),
            verbose: true,
            dry: true,
        }),
    ],
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
                                /* On ne spécifie pas de targets car on utilise .browserslistrc */
                                ['@babel/preset-env', {}]
                            ]
                        },
                    },
                ],
            },
            // Pour compiler et injecter du css
            {
                test: /\.css$/i,
                // loader: "css-loader",
                // options: {
                //     url: true,
                // },
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            // Pour compiler et injecter du sass
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'],
            },
            // {
            //     //test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/,
            //     test: /\.(png|jpg|gif)*/,
            //     use: [
            //       {
            //         loader: 'url-loader',
            //         options: {
            //           limit: 8192,
            //         },
            //       },
            //     ],
            // },
        ],
    },
};

module.exports = config;
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