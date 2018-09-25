var Jouer = (function(){
    var _jeu;
    var jouer = function(jeu){
        _jeu = jeu;
    }
    
    jouer.prototype = {
        create : function(){
            _jeu.physics.startSystem(Phaser.Physics.ARCADE);
            
             // ** Adapter le jeu à la taille de l'écran ** //
            _jeu.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            
            
            //Phaser.Physics.enableBody = true;
            
            this.hero = _jeu.add.sprite(800, 2450, 'hero');
            this.hero.anchor.setTo(0.5);
            
            // *** Boutons !!! ***//
            // On va se creer des parametres pour les boutons (un tableau vide)
            this.hero.parametres = {};                      
                        
            this.gauche = _jeu.add.button(40, 590, 'fleche_gauche'),
            this.gauche.fixedToCamera = true;
            this.gauche.events.onInputDown.add(function(){this.hero.parametres.gauche=true;},this);
            this.gauche.events.onInputUp.add(function(){this.hero.parametres.gauche=false;},this);
            
            this.droit = _jeu.add.button(200, 590, 'fleche_droit'),
            this.droit.fixedToCamera = true;
            this.droit.events.onInputDown.add(function(){this.hero.parametres.droit=true;},this);
            this.droit.events.onInputUp.add(function(){this.hero.parametres.droit=false;},this);
            
            this.haut = _jeu.add.button(120, 525, 'fleche_haut'),
            this.haut.fixedToCamera = true;
            this.haut.events.onInputDown.add(function(){this.hero.parametres.haut=true;},this);
            this.haut.events.onInputUp.add(function(){this.hero.parametres.haut=false;},this);               
            
            this.bas = _jeu.add.button(120, 645, 'fleche_bas'),
            this.bas.fixedToCamera = true;
            this.bas.events.onInputDown.add(function(){this.hero.parametres.bas=true;},this);
            this.bas.events.onInputUp.add(function(){this.hero.parametres.bas=false;},this);  

            
            this.sauter = _jeu.add.button(840, 590, 'bouton_sauter'),            
            this.sauter.fixedToCamera = true;
            this.sauter.events.onInputDown.add(function(){this.hero.parametres.sauter=true;},this);
            this.sauter.events.onInputUp.add(function(){this.hero.parametres.sauter=false;},this);
            // On va vers Update
            
            
            // *** Audio *** //
            this.sonFond = _jeu.add.audio("Mario");
            this.sonFond.play();
            // si on veut que le son s'entend en boucle (le parametre c'est le volume)
            this.sonFond.loopFull(0.5);
          
            // Creation des os
            
            this.groupeOs = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);
            this.groupeOs.create (600, 20, "os");
            this.groupeOs.create(20, 400, "os");
            this.groupeOs.create(800, 800, "os");
            this.groupeOs.create(640, 1200, "os");
            this.groupeOs.create(550, 1400, "os");
            this.groupeOs.create(40, 2000, "os");
            this.groupeOs.create(200, 2400, "os");
            this.groupeOs.create (780, 150, "os");
            this.groupeOs.create(60, 330, "os");
            this.groupeOs.create(880, 800, "os");
            this.groupeOs.create(300, 40, "os");
            this.groupeOs.create(64, 1200, "os");
            this.groupeOs.create(320, 1400, "os");
            this.groupeOs.create(40, 1800, "os");
            this.groupeOs.create(200, 1600, "os");
        
                        
                        
            // Ajouter la physique pour les personnages
            _jeu.physics.enable(this.hero);
            this.hero.body.collideWorldBounds = true;
            this.hero.body.gravity.y = 300;
            this.hero.body.bounce.y = 0.2;
            
            /* ---- Animations ---- */
            // Le cinquième parametre (#4) c'est le nombre de chiffres dans le fichier json après le nom du fichier
            this.hero.animations.add('idle', Phaser.Animation.generateFrameNames('chien', 0, 0, '', 4), 24, true);                 
            this.hero.animations.add('bouge', Phaser.Animation.generateFrameNames('chien', 0, 11, '', 4), 24, true);
            
            // On joue l'animation idle (en repos) par défaut
            this.hero.animations.play('idle');
            
            // On utilise l'info provenant du clavier
            this.curseur = _jeu.input.keyboard.createCursorKeys();            
                                                       
            // -- TILED -- //
            
            // Créer le monde (on va l'appeler niveau). On ajoute le tilemap qu'on avait chargé.
            this.niveau = _jeu.add.tilemap("carte");
            // On va dire quel tileset utiliser pour ce tilemap
            this.niveau.addTilesetImage("tuiles");
            
            // Ici on peut ajouter les layers...
            
            this.couche = {
                
                "fond" : this.niveau.createLayer("BackgroundLayer"),
                "devant" : this.niveau.createLayer("ForegroundLayer"),
            }
            
            // Pour faire qui le jeu s'ajuste aux differents écrans
            this.couche.fond.resizeWorld();
            this.couche.devant.resizeWorld();
                                   
            // Si on a plusieurs types de tuiles, on peut fournir un tableau d'index
            this.niveau.setCollision([7, 8], true, this.couche.fond);
            this.niveau.setCollision([53, 54, 55, 56, 57, 58, 59, 60, 86, 87, 88, 89, 90, 108, 118, 119, 120, 121, 122,  150, 151, 152, 153, 181, 182, 183, 184, 185, 186, 187, 188, 214, 215, 216, 217, 218, 246, 247, 248, 249, 250, 278, 279, 280, 281, 374, 375, 376, 377, 378, 379, 407, 439], true, this.couche.devant);
            
                                                    
            // Insertions de personnage dans le jeu
            
            _jeu.world.bringToTop(this.groupeOs);
            _jeu.world.bringToTop(this.hero);
            
            // Insertions des boutons dans le jeu //
            _jeu.world.bringToTop(this.haut); _jeu.world.bringToTop(this.bas);       _jeu.world.bringToTop(this.droit); _jeu.world.bringToTop(this.gauche);
            _jeu.world.bringToTop(this.sauter);
                                    
            // Camera
            
            this.camera.setPosition(0, 2400);
            this.camera.follow(this.hero);
                                            
            
            // Temps
            this.tempsRestant = 120;
            
            this.lblTemps = _jeu.add.text(50, 80, "Temps restant : ", { font: "26px Arial", fill: "#000", align: "center" });
            
            this.lblTemps.fixedToCamera = true;
            this.lblTemps.cameraOffset.setTo(50, 80);
            
            this.txtTemps = _jeu.add.text(240, 84, this.tempsRestant, { font: "24px Arial", fill: "#000", align: "center" });
            
            this.txtTemps.fixedToCamera = true;
            this.txtTemps.cameraOffset.setTo(240, 84);
            
            _jeu.time.events.repeat(Phaser.Timer.SECOND * 1, 120, this.afficheTemps, this);                        
            
        },
        
        update : function(){
            
            // On ajoute la collision
            _jeu.physics.arcade.collide(this.hero, this.couche.fond);
            _jeu.physics.arcade.collide(this.hero, this.couche.devant);            
            
            // Collision avec group
            _jeu.physics.arcade.collide(this.groupeOs, this.hero, this.collecterOs, null, this);                                                             
            this.hero.body.velocity.x = 0;
            
                                           
            // WASD //
            
            // Pour limiter le mouvement quand on bouge dans l'aire
            if(this.hero.parametres.gauche){
                this.hero.body.velocity.x = -140;
                if(this.hero.parametres.gauche && this.hero.body.onFloor()){
                this.hero.scale.x *= -1;
                this.hero.body.velocity.x = -250;
                }
            }
            
            // Pour limiter le mouvement quand on bouge dans l'aire
            if(this.hero.parametres.droit){
                this.hero.body.velocity.x = 140;
                if(this.hero.parametres.droit && this.hero.body.onFloor()){
                // this.hero.scale.x *= 1;
                this.hero.body.velocity.x = 250;
                } 
            }
            
            if(this.hero.parametres.haut && this.hero.body.onFloor){
                this.hero.body.velocity.y = -100;                
            }
            
            if(this.hero.parametres.bas){
                this.hero.body.velocity.y = 100;
            }
            
            if(this.hero.parametres.sauter && this.hero.body.onFloor()){
                  this.hero.body.velocity.y = -450;
            }
                    
            // Jouer animations
            
            if(this.hero.body.velocity.x == 0 && this.hero.body.velocity.y == 0){
                this.hero.animations.play("idle");
            }else{
                this.hero.animations.play("bouge");
            }
            
        },
            
        collecterOs : function(objetA, objetB){
            objetB.kill();
            if(this.groupeOs.getFirstAlive() == null){
                _jeu.state.start("Gagnant");
                this.sonFond.stop();
            }
        },
        
        afficheTemps : function(){
            this.txtTemps.text = --this.tempsRestant;
                                
            // Code de fin de jeu (perdant)
            
            if(this.tempsRestant == 0){
                _jeu.state.start("Perdant");
                this.sonFond.stop();
            }
                  
            
        },
        
            
    }
    
    return jouer;

})();







