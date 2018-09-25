var Perdant = (function(){
    var _jeu;
    var perdant = function(jeu){
        _jeu = jeu
    }
    
    perdant.prototype = {
        preload : function(){
            _jeu.load.image("perdant", "./assets/perdu.jpg");
            _jeu.load.image("bouton", "./assets/Demarrer.jpg");
        },
        
        create:function(){
                  
            if(!_jeu.ecranDemarrage.parent){
                _jeu.ecranDemarrage = _jeu.add.sprite(0,0, "perdant");
            }
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/2, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.47,-2.2);
            
        },
        demarrerJeu : function(){
            _jeu.state.start("Jouer");
        }
        
    }
    
    return perdant;
})()