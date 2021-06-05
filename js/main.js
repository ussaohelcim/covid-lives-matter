import SplashScreen from './splashscreen.js';
import Menu from './menu.js';
import Fases from './fases.js';
import Instrucoes from './instrucoes.js';

let splash = new SplashScreen();
let menu = new Menu();
let fases = new Fases();
let instrucoes = new Instrucoes();

let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics:{
        default: "arcade",
        arcade:{
            gravity:{y:800}
        }
    },scene: [splash,menu,fases,instrucoes],
    backgroundColor: '#b0e2f0'
    
};

let jogo = new Phaser.Game(config);
