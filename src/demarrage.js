var Demarrage = (function(){
    var _jeu;
    var demarrage = function(jeu){
        _jeu = jeu;
    }
    demarrage.prototype = {
        preload : function(){
            _jeu.load.image("ecran_demarrage", "./assets/demarrage.jpg");
            _jeu.load.image("barre_chargement", "./assets/chargement.png");
            // _jeu.stage.backgroundColor = "#77B5FE";
        },
        create: function(){
            
            // ** Adapter le jeu à la taille de l'écran ** //
            // _jeu.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            // _jeu.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
            
            
            _jeu.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            _jeu.scale.fullScreenScaleMode=Phaser.ScaleManager.SHOW_ALL;
            
            _jeu.scale.pageAlignHorizontally = true;
            _jeu.scale.pageAlignVertically = true;
            
            _jeu.state.start("Chargement", false);
        },
        
    }
    return demarrage;
})();








