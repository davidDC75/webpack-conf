# Configuration de webpack

## Différents webpack.config.js

### prod

1. webpack.prod.config.js => npm run prod
2. webpack.prod-watch.config.js => npm run watch-prod

### dev

1. webpack.dev.config.js => npm run dev
2. webpack.dev-watch.config.js => npm run watch-dev
3. webpack.config.js => npx webpack


### prod ou dev
1. webpack-all.config.js => npm run script-test
   Se comporte différement selon la variable d'environnement passée : NODE_ENV=dev