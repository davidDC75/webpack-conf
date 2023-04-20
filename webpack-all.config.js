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

// Configuration du css-loader
let dev_css_loader = {
    loader: 'css-loader',
    options: {
        sourceMap: true,
    },
};

let prod_css_loader = 'css-loader';

let module_rule = {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
            { // Ajout de babel-loader
                loader: 'babel-loader',
                options: {
                    presets: [
                        // utilise le fichier .browserslistrc
                        ['@babel/preset-env', {}]
                    ]
                },

            }],
        },
        // Pour compiler et injecter du css
        {
            test: /\.css$/i,
            /* pour le dev, on utilise plutôt de 'style-loader' */
            /* pour la prod, on crée des css */
            use: [
                dev?'style-loader':MiniCssExtractPlugin.loader,
                dev?dev_css_loader:prod_css_loader,
                'postcss-loader'
            ],

        },
        // Pour compiler et injecter du sass
        {
            test: /\.scss$/i,
            use: [
                /* pour le dev, on utilise plutôt de 'style-loader' */
                /* pour la prod, on crée des css */
                dev?'style-loader':MiniCssExtractPlugin.loader,
                dev?dev_css_loader:prod_css_loader,
                'postcss-loader',
                'sass-loader'
            ],
        },
        // {
        //     test: /\.(png|jpe?g|gif)$/i,
        //     use: [
        //         {
        //             loader: 'file-loader',
        //             options: {
        //                 name: '[name].[ext]',
        //                 outputPath: 'images',
        //             },
        //         },
        //         {
        //             loader: 'url-loader',
        //             options: {
        //                 limit: 8192,
        //             },
        //         },
        //         {
        //             loader: 'img-loader',
        //             options: {
        //                 enables: !dev,
        //             },
        //         },
        //     ],
        // },
    ],
};

let config = {
    mode: dev?'development':'production', // Choisir le mode : development ou production
    entry: './assets/js/app.js', // L'entry
    output: {
        path: path.resolve(__dirname, dev?'dist/dev':'dist/prod'),
        // Hash en dev et main en prod
        filename: dev?'[name]-[chunkhash].js':'[name].js',
    },

    plugins: [
        // plugins commun au deux modes
        new SimpleProgressWebpackPlugin(),
        new CleanWebpackPlugin({
            dry: false,
            verbose: true,
        }),
    ],

    // devtool uniquement en dev
    devtool: dev ? "eval-source-map" : false,

    module: module_rule,
};


// Si prod
if (!dev) {
    // Alors extrait les .css et .sass dans un fichier .css
    config.plugins.push(new MiniCssExtractPlugin({
        filename: '[name].css',
    }));

    // Lance une optimisation des fichiers (minimification)
    optimization= {
        optimization:
        {
            minimize: true,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        }
    }
    config=Object.assign(config,optimization);

// Si dev
} else {
    // Crée le fichier manifest.json
    config.plugins.push(new WebpackManifestPlugin({
        basePath: '',
        publicPath: '',
    }));

    // Active le watch
    watch = {
        watch: true,
        watchOptions: {
            aggregateTimeout: 4000,
        }
    }
    config=Object.assign(config,watch);

}

module.exports = config;