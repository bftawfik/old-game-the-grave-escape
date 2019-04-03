var LevelsScene = {
    assets: {},
    
    positions: {
        levelsPaletteLevel:{
            startX: -240,
            startY: 10
        },
        levelsPaletteLevelNo:{
            x: -7,
            y: 10
        },
        levelsHelpBtn: {
            x: 520,
            y: 600
        },
        levelsSettingBtn: {
            x: 660,
            y: 600
        },
        helpPaletteCloseBtn: {
            x: 0,
            y: 150
        },
        settingPaletteCloseBtn: {
            x: 0,
            y: 115
        },
        settingPaletteBgMusicBtn: {
            x: -100,
            y: -40
        },
        settingPaletteSoundEffectsBtn: {
            x: -100,
            y: 20
        }
    },
    
    
     preload: function(){
//        console.log("preload");
    },
    
    
    create: function(){
        console.log("create");
        this.assets.startBg = this.game.add.sprite(config.width/2, config.height/2, 'sceneBg');
        this.assets.startBg.anchor.set(0.5, 0.5);
        
        this.createlevelsPalette();
        
        this.assets.levelsHelpBtn = this.add.button(this.positions.levelsHelpBtn.x, this.positions.levelsHelpBtn.y, 'sceneHelpBtn', this.startHelpClicked, this, 1, 0, 0, 0);
        
        this.assets.levelsSettingBtn = this.add.button(this.positions.levelsSettingBtn.x, this.positions.levelsSettingBtn.y, 'sceneSettingBtn', this.startSettingClicked, this, 1, 0, 0, 0);
        
        this.createHelpPalette();
        
        this.createSettingPalette();
//        console.log(this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.destroy());
        if(globalVars.bgMusic && (this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.volume > 0 || this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.volume < 1)){
            this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.fadeIn(4000);
            this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.fadeOut(4000);
        }
    },
    
    
    update: function(){
//        console.log("update");
    },
    
    
    //-----------------------------------------------------------------------------------------
    
    
    createlevelsPalette: function(){
        
        this.assets.levelsPaletteBg = game.add.graphics(0, 0);
        this.assets.levelsPaletteBg.beginFill(0x000000, 0.8);
        this.assets.levelsPaletteBg.drawRect(0, 0, config.width, config.height);
        this.assets.levelsPaletteBg.endFill();
        
        this.assets.levelsPalette = this.game.add.sprite(config.width/2, config.height/2, 'levelsPalette');
        this.assets.levelsPalette.anchor.set(0.5, 0.5);
        
        for(var levelsCount=1; levelsCount<=globalVars.levels.count; levelsCount++){
            this.assets['levelsPaletteLevel'+levelsCount+'Btn'] = this.add.button(this.positions.levelsPaletteLevel.startX+((levelsCount-1)*120), this.positions.levelsPaletteLevel.startY,'palettesLevelBtn',this.levelsPaletteLevelClicked,this,null,null,null);
            this.assets['levelsPaletteLevel'+levelsCount+'Btn'].anchor.set(0.5, 0.5);
            this.assets['levelsPaletteLevel'+levelsCount+'Btn'].levelId = levelsCount;
            if(globalVars.levels['level'+levelsCount].unlocked){
                this.assets['levelsPaletteLevel'+levelsCount+'Btn'].frame = 1 + globalVars.levels['level'+levelsCount].stars;
                this.assets['levelsPaletteLevel'+levelsCount+'No'] = this.add.bitmapText(this.positions.levelsPaletteLevelNo.x, this.positions.levelsPaletteLevelNo.y, 'bahijFirasBold', ''+levelsCount, 60);
                this.assets['levelsPaletteLevel'+levelsCount+'No'].anchor.set(0.5, 0.5);
                this.assets['levelsPaletteLevel'+levelsCount+'Btn'].addChild(this.assets['levelsPaletteLevel'+levelsCount+'No']);
            }else{
                this.assets['levelsPaletteLevel'+levelsCount+'Btn'].frame = 0;
            }
            this.assets['levelsPaletteLevel'+levelsCount+'Btn'].inputEnabled = globalVars.levels['level'+levelsCount].unlocked;
            this.assets.levelsPalette.addChild(this.assets['levelsPaletteLevel'+levelsCount+'Btn']);
        }
//        console.log(globalVars.levels.count);
    },
    
    
    createHelpPalette: function(){
        this.assets.helpPaletteBg = game.add.graphics(0, 0);
        this.assets.helpPaletteBg.beginFill(0x000000, 0.8);
        this.assets.helpPaletteBg.drawRect(0, 0, config.width, config.height);
        this.assets.helpPaletteBg.endFill();
        this.assets.helpPaletteBg.inputEnabled = false;
        this.assets.helpPaletteBg.alpha = 0;
        
        this.assets.helpPalette = this.game.add.sprite(config.width/2, config.height/2, 'helpPalette');
        this.assets.helpPalette.anchor.set(0.5, 0.5);
        this.assets.helpPaletteBg.addChild(this.assets.helpPalette);
        
        this.assets.helpPaletteCloseBtn = this.add.button(this.positions.helpPaletteCloseBtn.x, this.positions.helpPaletteCloseBtn.y, 'palettesCloseBtn', this.helpPaletteCloseClicked, this, 1, 0, 0, 0);
        this.assets.helpPaletteCloseBtn.anchor.set(0.5, 0.5);
        this.assets.helpPaletteCloseBtn.inputEnabled = false;
        this.assets.helpPalette.addChild(this.assets.helpPaletteCloseBtn);
    },
    
    
    
    createSettingPalette: function(){
        this.assets.settingPaletteBg = game.add.graphics(0, 0);
        this.assets.settingPaletteBg.beginFill(0x000000, 0.8);
        this.assets.settingPaletteBg.drawRect(0, 0, config.width, config.height);
        this.assets.settingPaletteBg.endFill();
        this.assets.settingPaletteBg.inputEnabled = false;
        this.assets.settingPaletteBg.alpha = 0;
        
        this.assets.settingPalette = this.game.add.sprite(config.width/2, config.height/2, 'settingPalette');
        this.assets.settingPalette.anchor.set(0.5, 0.5);
        this.assets.settingPaletteBg.addChild(this.assets.settingPalette);
        
        this.assets.settingPaletteCloseBtn = this.add.button(this.positions.settingPaletteCloseBtn.x, this.positions.settingPaletteCloseBtn.y, 'palettesCloseBtn', this.settingPaletteCloseClicked, this, 1, 0, 0, 0);
        this.assets.settingPaletteCloseBtn.anchor.set(0.5, 0.5);
        this.assets.settingPaletteCloseBtn.inputEnabled = false;
        this.assets.settingPalette.addChild(this.assets.settingPaletteCloseBtn);
        
        this.assets.settingPaletteBgMusicBtn = this.add.button(this.positions.settingPaletteBgMusicBtn.x, this.positions.settingPaletteBgMusicBtn.y,'palettesSwitchBtn',this.settingPaletteBgMusicClicked,this,null,null,null);
        this.assets.settingPaletteBgMusicBtn.frame = globalVars.bgMusic? 0 : 1;
        this.assets.settingPaletteBgMusicBtn.anchor.set(0.5, 0.5);
        this.assets.settingPaletteBgMusicBtn.inputEnabled = false;
        this.assets.settingPalette.addChild(this.assets.settingPaletteBgMusicBtn);
        
        this.assets.settingPaletteSoundEffectsBtn = this.add.button(this.positions.settingPaletteSoundEffectsBtn.x, this.positions.settingPaletteSoundEffectsBtn.y,'palettesSwitchBtn',this.settingPaletteSoundEffectsClicked,this,null,null,null);
        this.assets.settingPaletteSoundEffectsBtn.frame = globalVars.soundEffects? 0 : 1;
        this.assets.settingPaletteSoundEffectsBtn.anchor.set(0.5, 0.5);
        this.assets.settingPaletteSoundEffectsBtn.inputEnabled = false;
        this.assets.settingPalette.addChild(this.assets.settingPaletteSoundEffectsBtn);
    },
    
    
    
    
    openHelpPalette: function(){
        if ((this.tween && this.tween.isRunning) || this.assets.helpPaletteBg.alpha === 1){
            return;
        }else{
            this.assets.helpPaletteBg.inputEnabled = true;
            this.assets.helpPaletteCloseBtn.inputEnabled = true;
            this.tween = this.add.tween(this.assets.helpPaletteBg).to({alpha: 1}, 500, Phaser.Easing.Cubic.Out, true);
        }
    },
    
    
    closeHelpPalette: function(){
        if ((this.tween && this.tween.isRunning) || this.assets.helpPaletteBg.alpha === 0){
            return;
        } else{
            this.assets.helpPaletteBg.inputEnabled = false;
            this.assets.helpPaletteCloseBtn.inputEnabled = false;
            this.tween = this.add.tween(this.assets.helpPaletteBg).to({alpha: 0}, 100, Phaser.Easing.Cubic.In, true);
        }
    },
    
    
    openSettingPalette: function(){
        if ((this.tween && this.tween.isRunning) || this.assets.settingPaletteBg.alpha === 1){
            return;
        }else{
            this.assets.settingPaletteBg.inputEnabled = true;
            this.assets.settingPaletteCloseBtn.inputEnabled = true;
            this.assets.settingPaletteBgMusicBtn.inputEnabled = true;
            this.assets.settingPaletteSoundEffectsBtn.inputEnabled = true;
            this.tween = this.add.tween(this.assets.settingPaletteBg).to({alpha: 1}, 500, Phaser.Easing.Cubic.Out, true);
        }
    },
    
     closeSettingPalette: function(){
//            console.log('closeSettingPalette');
        if ((this.tween && this.tween.isRunning) || this.assets.settingPaletteBg.alpha === 0){
            return;
        } else{
            this.assets.settingPaletteBg.inputEnabled = false;
            this.assets.settingPaletteCloseBtn.inputEnabled = false;
            this.assets.settingPaletteBgMusicBtn.inputEnabled = false;
            this.assets.settingPaletteSoundEffectsBtn.inputEnabled = false;
            this.tween = this.add.tween(this.assets.settingPaletteBg).to({alpha: 0}, 100, Phaser.Easing.Cubic.In, true);
        }
    },
    
    //-----------------------------------------------------------------------------------------
    
    
    startHelpClicked: function(){
//        console.log('startHelpClicked');
        this.openHelpPalette();
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    startSettingClicked: function(){
//        console.log('startSettingClicked');
        this.openSettingPalette();
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    helpPaletteCloseClicked: function(){
//         console.log('helpPaletteCloseClicked');
        this.closeHelpPalette();
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    settingPaletteCloseClicked: function(){
//        console.log('settingPaletteCloseClicked');
        this.closeSettingPalette();
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    settingPaletteBgMusicClicked: function(){
//        console.log('settingPaletteBgMusicClicked');
        if(globalVars.bgMusic){
            globalVars.bgMusic = false;
        }else{
            globalVars.bgMusic = true;
        }
        this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.mute = !globalVars.bgMusic;
        this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.mute = !globalVars.bgMusic;
        if(globalVars.bgMusic && (this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.volume > 0 || this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.volume < 1)){
            this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.volume = 1;
            this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.volume = 0;
        }
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
        storeGameData(n, globalVars);
        this.assets.settingPaletteBgMusicBtn.frame = globalVars.bgMusic? 0 : 1;
    },
    
    settingPaletteSoundEffectsClicked: function(){
//        console.log('settingPaletteSoundEffectsClicked');
        if(globalVars.soundEffects){
            globalVars.soundEffects = false;
        }else{
            globalVars.soundEffects = true;
        }
        this.game.state.states.StartScene.changeSoundEffectsState();
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
        storeGameData(n, globalVars);
        this.assets.settingPaletteSoundEffectsBtn.frame = globalVars.soundEffects? 0 : 1;
    },
    
    levelsPaletteLevelClicked: function(e){
//        console.log('levelsPaletteLevelClicked');
//        console.log('Level'+e.levelId+'Preloader');
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
        this.game.state.start('Level'+e.levelId+'Preloader');
    }
    
}