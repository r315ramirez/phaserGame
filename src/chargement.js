// Source : https://gist.github.com/jdnichollsc/f4f4af1cc6aa697bb274

var Chargement = (function(){
    var _jeu;
    var chargement = function(jeu){
        _jeu = jeu
    }
    chargement.prototype = {
        preload: function(){
            _jeu.load.image("bouton", "assets/bouton.jpg");
            _jeu.load.image("fleche_gauche", "assets/gauche.png");
            _jeu.load.image("fleche_droit", "assets/droite.png");
            _jeu.load.image("fleche_haut", "assets/up.png");
            _jeu.load.image("fleche_bas", "assets/down.png");
            _jeu.load.image("bouton_sauter", "assets/bouton.png");
            
            
            _jeu.load.atlasJSONHash('hero', 'assets/chienBouge1.png', 'assets/chienBouge1.json');
            
            
            // Collectables (os)
            _jeu.load.image("os", "assets/osMauve.png");
            
            /* Son de fond crée par Thiaz Itch (Source: http://freemusicarchive.org/music/Thiaz_Itch/VG_Unplugged_PRT015_1888/ThiazItch-08-Super_Mario_2 Et utilisé avec licence CC BY-NC-ND 4.0 */
            // Audio
            _jeu.load.audio("Mario", "assets/MarioRemix.mp3");
            
                   
            // On charge le tileset (on met le nom qu'on veut)
            _jeu.load.image("tuiles", "assets/generic_platformer_tiles.png");
            // On charge le TILEMAP (on met le nom qu'on veut)
            _jeu.load.tilemap("carte", "assets/ramirezTilemap.json", null, Phaser.Tilemap.TILED_JSON);
            
                        
            
            _jeu.ecranDemarrage = _jeu.add.sprite(0,0, "ecran_demarrage");
            _jeu.barreChargement = _jeu.add.sprite (160, 240, "barre_chargement");
            this.load.setPreloadSprite(_jeu.barreChargement);
            
            
        },
        create:function(){
            _jeu.barreChargement.destroy();
            _jeu.state.start("Menu", false);
        }
    }
    
    return chargement;
})()