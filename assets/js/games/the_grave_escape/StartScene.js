var StartScene = {
    
    assets: {},
    
    musicAssets: {},
    
    positions: {
        startHelpBtn: {
            x: 450,
            y: 600
        },
        startSettingBtn: {
            x: 590,
            y: 600
        },
        startPlayBtn: {
            x: 730,
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
//        console.log("create");
        this.assets.startBg = this.game.add.sprite(config.width/2, config.height/2, 'sceneBg');
        this.assets.startBg.anchor.set(0.5, 0.5);
        
        this.assets.startHelpBtn = this.add.button(this.positions.startHelpBtn.x, this.positions.startHelpBtn.y, 'sceneHelpBtn', this.startHelpClicked, this, 1, 0, 0, 0);
        
        this.assets.startSettingBtn = this.add.button(this.positions.startSettingBtn.x, this.positions.startSettingBtn.y, 'sceneSettingBtn', this.startSettingClicked, this, 1, 0, 0, 0);
        
        this.assets.startPlayBtn = this.add.button(this.positions.startPlayBtn.x, this.positions.startPlayBtn.y, 'scenePlayBtn', this.startPlayClicked, this, 1, 0, 0, 0);
        
        this.createHelpPalette();
        
        this.createSettingPalette();
        
        this.musicAssets.mainBackgroundMusic = this.game.add.audio('mainBackgroundMusic', 1, true);
        this.musicAssets.mainBackgroundMusic.play();
        this.musicAssets.mainBackgroundMusic.mute = !globalVars.bgMusic;
        
        this.musicAssets.levelsBackgroundMusic = this.game.add.audio('levelsBackgroundMusic', 0, true);
        this.musicAssets.levelsBackgroundMusic.play();
        this.musicAssets.levelsBackgroundMusic.mute = !globalVars.bgMusic;
        
        this.musicAssets.levelsThrowEffect = this.game.add.audio('levelsThrowEffect', 1, false);
        this.musicAssets.levelsHitEffect = this.game.add.audio('levelsHitEffect', 1, false);
        this.musicAssets.levelsCryEffect = this.game.add.audio('levelsCryEffect', 1, false);
        this.musicAssets.levelsKilledEffect = this.game.add.audio('levelsKilledEffect', 1, false);
        this.musicAssets.levelsWalkEffect = this.game.add.audio('levelsWalkEffect', 1, true);
        this.musicAssets.levelsExplosionEffect = this.game.add.audio('levelsExplosionEffect', 1, false);
        this.musicAssets.levelsCollectEffect = this.game.add.audio('levelsCollectEffect', 1, false);
        this.musicAssets.levelsClimbEffect = this.game.add.audio('levelsClimbEffect', 1, true);
        this.musicAssets.levelsRisingEffect = this.game.add.audio('levelsRisingEffect', 1, false);
        this.musicAssets.levelsEatingEffect = this.game.add.audio('levelsEatingEffect', 1, false);
        this.musicAssets.levelsFireOnEffect = this.game.add.audio('levelsFireOnEffect', 1, false);
        this.musicAssets.levelsDoorOpenEffect = this.game.add.audio('levelsDoorOpenEffect', 1, false);
        this.musicAssets.levelsCheeringEffect = this.game.add.audio('levelsCheeringEffect', 1, false);
        this.musicAssets.levelsClickEffect = this.game.add.audio('levelsClickEffect', 1, false);
        this.changeSoundEffectsState();
    },
    
    
    update: function(){
//        console.log("update");
    },
    
    
    //-----------------------------------------------------------------------------------------
    
    
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
    
    startPlayClicked: function(){
//        console.log('startPlayClicked');
        this.game.state.start('LevelsScene');
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
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
        if(globalVars.bgMusic){
            globalVars.bgMusic = false;
        }else{
            globalVars.bgMusic = true;
        }
        this.musicAssets.mainBackgroundMusic.mute = !globalVars.bgMusic;
        this.musicAssets.levelsBackgroundMusic.mute = !globalVars.bgMusic;
        if(globalVars.bgMusic && (this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.volume > 0 || this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.volume < 1)){
            this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.volume = 1;
            this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.volume = 0;
        }
        storeGameData(n, globalVars);
        this.assets.settingPaletteBgMusicBtn.frame = globalVars.bgMusic? 0 : 1;
    },
    
    settingPaletteSoundEffectsClicked: function(){
//        console.log('settingPaletteSoundEffectsClicked');
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
        if(globalVars.soundEffects){
            globalVars.soundEffects = false;
        }else{
            globalVars.soundEffects = true;
        }
        this.changeSoundEffectsState();
        storeGameData(n, globalVars);
        this.assets.settingPaletteSoundEffectsBtn.frame = globalVars.soundEffects? 0 : 1;
    },
    
    changeSoundEffectsState: function(){
//        console.log('changeSoundEffectsState');
        this.musicAssets.levelsThrowEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsHitEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsCryEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsKilledEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsWalkEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsExplosionEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsCollectEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsClimbEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsRisingEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsEatingEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsFireOnEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsDoorOpenEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsCheeringEffect.mute = !globalVars.soundEffects;
        this.musicAssets.levelsClickEffect.mute = !globalVars.soundEffects;
    }
}