const path = require('path');
/* Pour générer une seule configuration */

// module.exports = {
//     mode: 'development',
//     entry: './assets/js/app.js',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js',
//     },
// };

/* Pour générer multiple configuration */

module.exports = [
    {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'production.js',
            // libraryTarget: 'amd',
        },
        // name: 'amd',
        entry: './assets/js/app.js',
        watch: true,
        watchOptions: {
            aggregateTimeout: 4000,
        },
        mode: 'production',
    },
    {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'development.js',
            // libraryTarget: 'commonjs',
        },
        // name: 'commonjs',
        entry: './assets/js/app.js',
        watch: true,
        watchOptions: {
            aggregateTimeout: 4000,
        },
        mode: 'development',
    },
]