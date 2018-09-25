var Fin = (function(){
    var _jeu;
    var fin = function(jeu){
        _jeu = jeu
    }
    fin.prototype = {
        init : function(pointage){
            this.pointage = pointage;
        },
        create:function(){
                        
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/2, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.5,.5);
        },
        
        demarrerJeu : function(){
            _jeu.state.start("Jouer");
        }
        
    }
    
    return fin;
})()