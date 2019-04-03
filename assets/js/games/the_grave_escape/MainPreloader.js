var MainPreloader = {
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
            this.game.state.start('StartScene');
        }
    },
    
    
    
    createPreloader: function(){
        this.assets.mainPreloaderBg = this.game.add.sprite(0, 0, 'mainPreloaderBg');
        var bgScale = this.game.world.width/ this.assets.mainPreloaderBg.width;
        this.assets.mainPreloaderBg.scale.setTo(bgScale);
        this.assets.mainPreloaderBarBg = this.game.add.sprite(this.game.world.width/2, this.game.world.height * 0.73, 'mainPreloaderBarBg');
        this.assets.mainPreloaderBarBg.anchor.setTo(0, 0.5);
        this.assets.mainPreloaderBarBg.x+= this.assets.mainPreloaderBarBg.width / -2;
        this.assets.mainPreloaderBarFill = this.game.add.sprite(this.game.world.width/2, this.game.world.height * 0.73, 'mainPreloaderBarFill');
        this.assets.mainPreloaderBarFill.anchor.setTo(0, 0.5);
        this.assets.mainPreloaderBarFill.x+= this.assets.mainPreloaderBarBg.width / -2;
        this.game.load.setPreloadSprite(this.assets.mainPreloaderBarFill);
    },
    
    
    onLoadComplete: function(){
//        console.log("onLoadComplete");
        this.ready = true;
    },
    
    loadResources: function(){
//        console.log("loadResources");
        this.game.load.image('arcade-slopes-80', 'assets/img/allLevels/arcade-slopes-80.png');
        
        this.game.load.image('sceneBg', 'assets/img/allLevels/sceneBg.png');
        this.game.load.spritesheet('scenePlayBtn', 'assets/img/allLevels/scenePlayBtn.png', 100, 100, 2);
        this.game.load.spritesheet('sceneSettingBtn', 'assets/img/allLevels/sceneSettingBtn.png', 100, 100, 2);
        this.game.load.spritesheet('sceneHelpBtn', 'assets/img/allLevels/sceneHelpBtn.png', 100, 100, 2);
        
        this.game.load.image('helpPalette', 'assets/img/allLevels/helpPalette.png');
        this.game.load.spritesheet('palettesCloseBtn', 'assets/img/allLevels/palettesCloseBtn.png', 70, 70, 2);
        
        this.game.load.image('settingPalette', 'assets/img/allLevels/settingPalette.png');
        this.game.load.spritesheet('palettesSwitchBtn', 'assets/img/allLevels/palettesSwitchBtn.png', 60, 30, 2);
        
        this.game.load.image('levelsPalette', 'assets/img/allLevels/levelsPalette.png');
        this.game.load.spritesheet('palettesLevelBtn', 'assets/img/allLevels/palettesLevelBtn.png', 80, 95, 5);
        
        this.game.load.spritesheet('levelIcons', 'assets/img/allLevels/levelIcons.png', 32, 30, 4);
        this.game.load.image('iconsPalette', 'assets/img/allLevels/iconsPalette.png');
        this.game.load.image('buttonsPalette', 'assets/img/allLevels/buttonsPalette.png');
        
        this.game.load.image('gameOverPalette', 'assets/img/allLevels/gameOverPalette.png');
        this.game.load.spritesheet('palettesReplayBtn', 'assets/img/allLevels/palettesReplayBtn.png', 70, 70, 2);
        
        this.game.load.image('youWonPalette', 'assets/img/allLevels/youWonPalette.png');
        this.game.load.spritesheet('palettesNextBtn', 'assets/img/allLevels/palettesNextBtn.png', 70, 70, 2);
        this.game.load.image('scorePalette', 'assets/img/allLevels/scorePalette.png');
        
        this.game.load.image('levelsTiles', 'assets/img/allLevels/levelsTiles.png');
        
        this.game.load.bitmapFont('bahijFirasBold', 'assets/bitmapFonts/bahijFirasBold/bahijFirasBold.png', 'assets/bitmapFonts/bahijFirasBold/bahijFirasBold.fnt');
        
        this.game.load.image('levelPreloaderBg', 'assets/img/allLevels/levelPreloaderBg.png');
        this.game.load.image('levelPreloaderFill', 'assets/img/allLevels/levelPreloaderFill.png');
        this.game.load.spritesheet('levelPreloaderText', 'assets/img/animation/levelPreloaderTextAnim_140_40_4.png', 140, 40, 4);
        
        this.game.load.image('fire', 'assets/img/allLevels/fire.png');
        this.game.load.spritesheet('fireAnim', 'assets/img/animation/fireAnim_75_50_4.png', 75, 50, 4);        
//        this.game.load.spritesheet('blueDiamondAnim', 'assets/img/animation/blueDiamondAnim_45_39_5.png', 45, 39, 5);
        this.game.load.spritesheet('blueDiamondAnim', 'assets/img/animation/blueDiamondAnim_23_20_5.png', 23, 20, 5);
//        this.game.load.spritesheet('redDiamondAnim', 'assets/img/animation/redDiamondAnim_45_39_5.png', 45, 39, 5);
        this.game.load.spritesheet('redDiamondAnim', 'assets/img/animation/redDiamondAnim_23_20_5.png', 23, 20, 5);
//        this.game.load.spritesheet('coinAnim', 'assets/img/animation/coinAnim_37_40_6.png', 37, 40, 6);
//        this.game.load.spritesheet('coinAnim', 'assets/img/animation/coinAnim_18_20_6.png', 18, 20, 6);
        this.game.load.spritesheet('coinAnim', 'assets/img/animation/coinAnim_18_20_5.png', 18, 20, 5);
        this.game.load.spritesheet('chestAnim', 'assets/img/animation/chestAnim_45_50_4.png', 45, 50, 4);
        this.game.load.spritesheet('coffinAnim', 'assets/img/animation/coffinAnim_145_155_5.png', 145, 155, 5);
        this.game.load.spritesheet('flatDoorAnim', 'assets/img/animation/flatDoorAnim_75_100_6.png', 75, 100, 6);
//        this.game.load.spritesheet('flatDoorAnim', 'assets/img/animation/flatDoorAnim_120_160_6.png', 120, 160, 6);
        this.game.load.spritesheet('roundDoorAnim', 'assets/img/animation/roundDoorAnim_80_100_6.png', 80, 100, 6);
        this.game.load.spritesheet('doorSwitchAnim', 'assets/img/animation/doorSwitchAnim_48_30_4.png', 48, 30, 4);
        this.game.load.spritesheet('explosionAnim', 'assets/img/animation/explosionAnim_150_145_6.png', 150, 145, 6);
        
        this.game.load.spritesheet('heroWalkAnim', 'assets/img/animation/heroWalkAnim_32_58_4.png', 32, 58, 4);
        this.game.load.spritesheet('heroShootAnim', 'assets/img/animation/heroShootAnim_47_58_4.png', 47, 58, 4);
        this.game.load.spritesheet('heroDieAnim', 'assets/img/animation/heroDieAnim_72_58_3.png', 72, 58, 3);
        this.game.load.spritesheet('heroClimbAnim', 'assets/img/animation/heroClimbAnim_37_58_4.png', 37, 58, 4);
        this.game.load.spritesheet('heroRiseAsMummyAnim', 'assets/img/animation/heroRiseAsMummyAnim_97_60_5.png', 97, 60, 5);
        
        this.game.load.image('arrow', 'assets/img/allLevels/arrow.png');
        
        this.game.load.image('spiderStandAnim', 'assets/img/animation/spiderStandAnim_95_70_1.png');
        this.game.load.spritesheet('spiderWalkAnim', 'assets/img/animation/spiderWalkAnim_95_70_8.png', 95, 70, 8);
        this.game.load.spritesheet('spiderClimbAnim', 'assets/img/animation/spiderClimbAnim_95_70_6.png', 95, 70, 6);
        this.game.load.spritesheet('spiderDieAnim', 'assets/img/animation/spiderDieAnim_125_70_7.png', 125, 70, 7);
        
        this.game.load.spritesheet('mummyRunAnim', 'assets/img/animation/mummyRunAnim_39_58_6.png', 39, 58, 6);
        this.game.load.spritesheet('mummyWalkAnim', 'assets/img/animation/mummyWalkAnim_46_58_8.png', 46, 58, 8);
        this.game.load.spritesheet('mummyRiseAnim', 'assets/img/animation/mummyRiseAnim_51_58_8.png', 51, 58, 8);
        this.game.load.spritesheet('mummyJogAnim', 'assets/img/animation/mummyJogAnim_48_60_7.png', 48, 60, 7);
        this.game.load.spritesheet('mummyDieAnim', 'assets/img/animation/mummyDieAnim_77_60_5.png', 77, 60, 5);
        this.game.load.spritesheet('mummyStandAnim', 'assets/img/animation/mummyStandAnim_38_59_6.png', 38, 59, 6);
        
        this.game.load.image('barrel', 'assets/img/allLevels/barrel.png');
        this.game.load.image('box', 'assets/img/allLevels/box.png');
        this.game.load.image('circularSaw', 'assets/img/allLevels/circularSaw.png');
        this.game.load.image('circularVase', 'assets/img/allLevels/circularVase.png');
        this.game.load.image('tallVase', 'assets/img/allLevels/tallVase.png');
        this.game.load.image('enemiesGenerator', 'assets/img/allLevels/enemiesGenerator.png');
        
        this.game.load.audio('mainBackgroundMusic', ['assets/mp3/Night_Music.mp3', 'assets/ogg/Night_Music.ogg']);
        this.game.load.audio('levelsBackgroundMusic', ['assets/mp3/Lost_In_The_Forest.mp3', 'assets/ogg/Lost_In_The_Forest.ogg']);
        this.game.load.audio('levelsThrowEffect', ['assets/mp3/Throw.mp3', 'assets/ogg/Throw.ogg']);
        this.game.load.audio('levelsHitEffect', ['assets/mp3/Hit.mp3', 'assets/ogg/Hit.ogg']);
		this.game.load.audio('levelsCryEffect', ['assets/mp3/Cry.mp3', 'assets/ogg/Cry.ogg']);
        this.game.load.audio('levelsKilledEffect', ['assets/mp3/Killed.mp3', 'assets/ogg/Killed.ogg']);
        this.game.load.audio('levelsWalkEffect', ['assets/mp3/Walk.mp3', 'assets/ogg/Walk.ogg']);
        this.game.load.audio('levelsExplosionEffect', ['assets/mp3/Explosion.mp3', 'assets/ogg/Explosion.ogg']);
        this.game.load.audio('levelsCollectEffect', ['assets/mp3/Collect.mp3', 'assets/ogg/Collect.ogg']);
        this.game.load.audio('levelsClimbEffect', ['assets/mp3/Climb.mp3', 'assets/ogg/Climb.ogg']);
        this.game.load.audio('levelsRisingEffect', ['assets/mp3/Rising.mp3', 'assets/ogg/Rising.ogg']);
        this.game.load.audio('levelsEatingEffect', ['assets/mp3/Eating2.mp3', 'assets/ogg/Eating2.ogg']);
        this.game.load.audio('levelsFireOnEffect', ['assets/mp3/Fire_On.mp3', 'assets/ogg/Fire_On.ogg']);
        this.game.load.audio('levelsDoorOpenEffect', ['assets/mp3/Door_Open.mp3', 'assets/ogg/Door_Open.ogg']);
        this.game.load.audio('levelsCheeringEffect', ['assets/mp3/Cheering.mp3', 'assets/ogg/Cheering.ogg']);
        
        this.game.load.audio('levelsClickEffect', ['assets/mp3/Click.mp3', 'assets/ogg/Click.ogg']);
        
    },
}












