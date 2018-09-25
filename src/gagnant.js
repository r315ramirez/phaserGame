var Gagnant = (function(){
    var _jeu;
    var gagnant = function(jeu){
        _jeu = jeu
    }
    
    gagnant.prototype = {
        preload : function(){
            _jeu.load.image("gagnant", "./assets/gagne.jpg");
            _jeu.load.image("buttonRjr", "./assets/Niveau_2.jpg");
        },
                
        create:function(){
            
            if(!_jeu.ecranDemarrage.parent){
                _jeu.ecranDemarrage = _jeu.add.sprite(0,0, "gagnant");
            }
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/2, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.47,-2.2);
            
        },
        
        demarrerJeu : function(){
            _jeu.state.start("Jouer");
        }
        
    }
    
    return gagnant;
})()