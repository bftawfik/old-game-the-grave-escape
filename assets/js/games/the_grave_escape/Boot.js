var Boot = {
    ready: false,
    
     preload: function(){
//        console.log("preload");
        this.updateGameScale();
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.loadResources();
    },
    
    
    create: function(){
//        console.log("create");
    },
    
    
    update: function(){
//        console.log(this.ready);
        if (this.ready){
            this.game.state.start('MainPreloader');
        }
    },
    
    
    
    updateGameScale: function(){
//        console.log("updateGameScale");
    },
    
    
    onLoadComplete: function(){
//        console.log("onLoadComplete");
        this.ready = true;
    },
    
    loadResources: function(){
//        console.log("loadResources");
        this.game.load.image('mainPreloaderBg', 'assets/img/mainPreloader/mainPreloaderBg.jpg');
        this.game.load.image('orient', 'assets/img/mainPreloader/orient.jpg');
        this.game.load.image('mainPreloaderBarBg', 'assets/img/mainPreloader/mainPreloaderBarBg.png');
        this.game.load.image('mainPreloaderBarFill', 'assets/img/mainPreloader/mainPreloaderBarFill.png');
    },
}