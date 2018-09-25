(function(){
    "use strict";
    
    // Dimensions du viewport
    var jeu = new Phaser.Game(1280, 740, Phaser.AUTO, "jeu");
    
    jeu.state.add("Demarrage", Demarrage);
    jeu.state.add("Chargement", Chargement);
    jeu.state.add("Menu", Menu);
    jeu.state.add("Jouer", Jouer);
    jeu.state.add("Gagnant", Gagnant);
    jeu.state.add("Perdant", Perdant);
    jeu.state.add("Fin", Fin);
    
    jeu.state.start("Demarrage");
    
    
})();