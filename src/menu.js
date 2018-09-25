var Menu = (function(){
    var _jeu;
    var menu = function(jeu){
        _jeu = jeu
    }
    menu.prototype = {
        create:function(){
                        
            if(!_jeu.ecranDemarrage.parent){
                _jeu.ecranDemarrage = _jeu.add.sprite(0,0, "ecran_demarrage");
            }
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/1.5, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.5,.5);
            
            // _jeu.state.start("Jouer");
        },
        
        demarrerJeu : function(){
                                
            _jeu.state.start("Jouer");
        }
        
    }
    
    return menu;
})()