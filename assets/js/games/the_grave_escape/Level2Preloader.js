var Level2Preloader = {
    ready: false,
    assets: {},
    
     preload: function(){
//        console.log("preload");
        
        this.createPreloader();
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.loadResources();
    },
    
    
    create: function(){
//        console.log("create");
        
    },
    
    
    update: function(){
//        console.log(this.ready);
        if (this.ready){
            this.game.state.start('Level2Scene');
        }
    },
    
    
    
    createPreloader: function(){
        this.assets.startBg = this.game.add.sprite(config.width/2, config.height/2, 'sceneBg');
        this.assets.startBg.anchor.set(0.5, 0.5);
        
        this.assets.levelPreloaderBlackBg = game.add.graphics(0, 0);
        this.assets.levelPreloaderBlackBg.beginFill(0x000000, 0.8);
        this.assets.levelPreloaderBlackBg.drawRect(0, 0, config.width, config.height);
        this.assets.levelPreloaderBlackBg.endFill();
        
        this.assets.levelPreloaderBg = this.game.add.sprite(config.width/2, config.height/2, 'levelPreloaderBg');
        this.assets.levelPreloaderBg.anchor.set(0.5, 0.5);
        
        this.assets.levelPreloaderFill = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, 'levelPreloaderFill');
        this.assets.levelPreloaderFill.anchor.setTo(0, 0.5);
        this.assets.levelPreloaderFill.x+= this.assets.levelPreloaderFill.width / -2;
        
        this.game.load.setPreloadSprite(this.assets.levelPreloaderFill);
        
        this.assets.levelPreloaderText = this.game.add.sprite(this.game.world.width/2, this.game.world.height/2, 'levelPreloaderText');
        this.assets.levelPreloaderText.anchor.setTo(0.5, 0.5);
        this.assets.levelPreloaderText.y-= 40;
        
        this.assets.levelPreloaderText.animations.add('play');
        this.assets.levelPreloaderText.animations.play('play', 2, true);
    },
    
    
    onLoadComplete: function(){
//        console.log("onLoadComplete");
        this.ready = true;
    },
    
    loadResources: function(){
//        console.log("loadResources");
        this.game.load.tilemap('level1Map', 'assets/map/level1Map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('temp', 'assets/img/level1/temp.jpg');
    },
}












