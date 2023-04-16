/* Pour importer toutes les fonctions */
//import * as obj from './log.js';
//console.log(obj);

/* Pour importer une fonction */
import { log2 } from './log.js';

// Grâce au json loader inclu par défaut, on peut importer des json
import config from './config.json';

// Importe un fichier de config javascript
import compress from './config.js';

// Importe un fichier css
// Dans le webpack.config.js on utilise le style-loader et le css-loader dans une rule
import * as css from '../css/app.css';

// Import un fichier scss
// Dans le webpack.config.js on utilise le sass-loader
import * as scss from '../css/app.scss';


//import 'bootstrap';

//   Importe le module dans node_modules/ jquery
//import $ from 'jquery'; /* on commente pour le lazy-loading */

/* Pour en importer plusieurs */
//import {log,log2} from './log.js';

let a = "Ça fonctionne super bien";

let [b,,c]= [1,2,4,5];

// Exécute la fonction log2
//log2(b);

// Affiche la configuration loader à partir d'un json
//console.log(config);

// Affiche compress loader à partir d'un fichier de config javascript
//console.log(compress);

// En environnement de dev on peut mettre des break-points avec la commande : debugger
// Ne fonctionne qu'en mode env dev
debugger

console.log(css);
console.log(scss);

console.log(a);

// On utilise jquery
document.getElementById('button').addEventListener('click', function() {
    // lazy loading de jquery ici
    // https://webpack.js.org/guides/lazy-loading/
    import(/* webpackChunkName: "jquery" */ 'jquery').then( module => {
        const $ = module.default;
        $('h2').css('backgroundColor','#9F9F9F');
    });

})

