const path = require('path');
/* Pour générer une seule configuration */

module.exports = {
    mode: 'development', // Choisir le mode : development ou production
    entry: './assets/js/app.js', // L'entry
    output: {
        path: path.resolve(__dirname, 'dist'), // Le chemin absolue du répertoire de destination
        filename: 'development.js', // Le nom du fichier de sortie
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 4000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                // use: ['babel-loader']
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
            }
        ]
    }
};

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