/* Pour importer toutes les fonctions */
//import * as obj from './log.js';
//console.log(obj);

/* Pour importer une fonction */
import { log2 } from './log.js';

// Grâce au json loader inclu par défaut, on peut importer des json
import config from './config.json';

/* Pour en importer plusieurs */
//import {log,log2} from './log.js';

let a = "Ça fonctionne super bien";

let [b,,c]= [1,2,4,5];

log2(b);

// Affiche la configuration loader à partir d'un json
console.log(config);