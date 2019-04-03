var Level1Scene = {
    assets: {},
    
    positions: {
        stagePalletes: {
            startX: 10,
            startY: 10,
            distance: 50
        },
        stageIcons: {
            startX: 5,
            startY: 5
        },
        stageText: {
            startX: 96,
            startY: 26
        },
        buttonsPalette: {
            x: 1200,
            y: 50,
        },
        stageHelpBtn: {
            x: -30,
            y: 0
        },
        stageSettingBtn: {
            x: 30,
            y: 0
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
    
    requirements: {
        timer: {
            index: 0,
            duration: 30,
        },
        coins: {
            index: 1,
            required: 25,
        },
        blueDiamond: {
            index: 2,
            required: 25,
        },
        redDiamond: {
            index: 3,
            required: 25,
        }        
    },
    
     preload: function(){
        console.log("preload");
    },
    
    
    create: function(){
        console.log("create");
        this.assets.level1Map = this.add.tilemap('level1Map');
        this.assets.level1Map.addTilesetImage('levelsTiles', 'levelsTiles');
        this.assets.level1Map.setCollision([1, 2, 3, 4, 7, 8]);
        this.assets.level1Layer1 = this.assets.level1Map.createLayer("level1Layer1");
        this.assets.level1Layer1.resizeWorld();
        
        this.createRequirements();
        
        this.createButtons();
        
        this.createHelpPalette();
        
        this.createSettingPalette();
        
        
        
//        this.assets.fireAnim = this.game.add.sprite(100, 100, 'fireAnim');
//        this.assets.fireAnim.animations.add('anim', [0, 1, 2, 3, 4], 10, true);
//        this.assets.fireAnim.animations.play('anim');
//        
//        
//        this.assets.blueDiamondAnim = this.game.add.sprite(200, 100, 'blueDiamondAnim');
//        this.assets.blueDiamondAnim.animations.add('anim', [0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 24, true);
//        this.assets.blueDiamondAnim.animations.play('anim');
//        
//        this.assets.redDiamondAnim = this.game.add.sprite(300, 100, 'redDiamondAnim');
//        this.assets.redDiamondAnim.animations.add('anim', [0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 24, true);
//        this.assets.redDiamondAnim.animations.play('anim');
//        
//        this.assets.coinAnim = this.game.add.sprite(400, 100, 'coinAnim');
//        this.assets.coinAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 24, true);
//        this.assets.coinAnim.animations.play('anim');
//        
//        this.assets.chestAnim = this.game.add.sprite(500, 100, 'chestAnim');
//        this.assets.chestAnim.animations.add('anim', [0, 1, 2, 3], 7, true);
//        this.assets.chestAnim.animations.play('anim');
//        
//        this.assets.coffinAnim = this.game.add.sprite(600, 100, 'coffinAnim');
//        this.assets.coffinAnim.animations.add('anim', [0, 1, 2, 3, 4], 7, true);
//        this.assets.coffinAnim.animations.play('anim');
//        
//        this.assets.flatDoorAnim = this.game.add.sprite(800, 100, 'flatDoorAnim');
//        this.assets.flatDoorAnim.animations.add('anim', [0, 1, 2, 3, 4, 5], 7, true);
//        this.assets.flatDoorAnim.animations.play('anim');
//        
//        this.assets.roundDoorAnim = this.game.add.sprite(900, 100, 'roundDoorAnim');
//        this.assets.roundDoorAnim.animations.add('anim', [0, 1, 2, 3, 4, 5], 7, true);
//        this.assets.roundDoorAnim.animations.play('anim');
//
//
//        this.assets.switchAnim = this.game.add.sprite(100, 200, 'switchAnim');
//        this.assets.switchAnim.animations.add('anim', [0, 1, 2, 3], 7, true);
//        this.assets.switchAnim.animations.play('anim');
//        
//        this.assets.explosionAnim = this.game.add.sprite(200, 200, 'explosionAnim');
//        this.assets.explosionAnim.animations.add('anim', [0, 1, 2, 3, 4, 5], 20, true);
//        this.assets.explosionAnim.animations.play('anim');
//        
//        this.assets.heroWalkAnim = this.game.add.sprite(400, 200, 'heroWalkAnim');
//        this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3], 5, true);
//        this.assets.heroWalkAnim.animations.play('anim');
//        
//        this.assets.heroShootAnim = this.game.add.sprite(500, 200, 'heroShootAnim');
//        this.assets.heroShootAnim.animations.add('anim', [0, 1, 2, 3], 5, true);
//        this.assets.heroShootAnim.animations.play('anim');
//        
//        this.assets.heroDieAnim = this.game.add.sprite(600, 200, 'heroDieAnim');
//        this.assets.heroDieAnim.animations.add('anim', [0, 1, 2], 5, true);
//        this.assets.heroDieAnim.animations.play('anim');
//
//        this.assets.spiderWalkAnim = this.game.add.sprite(700, 200, 'spiderWalkAnim');
//        this.assets.spiderWalkAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
//        this.assets.spiderWalkAnim.animations.play('anim');
//        
//        this.assets.spiderShootAnim = this.game.add.sprite(800, 200, 'spiderShootAnim');
//        this.assets.spiderShootAnim.animations.add('anim', [0, 1, 2, 3, 4, 5], 10, true);
//        this.assets.spiderShootAnim.animations.play('anim');
//        
//        this.assets.spiderDieAnim = this.game.add.sprite(900, 200, 'spiderDieAnim');
//        this.assets.spiderDieAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 6], 5, true);
//        this.assets.spiderDieAnim.animations.play('anim');
//        
//        this.assets.spiderDieAnim = this.game.add.sprite(100, 300, 'spiderStandAnim');
        
        
//        this.assets.heroWalkAnim = this.add.sprite(400, 200, 'heroWalkAnim');
//        heroState = "walking";
//        this.game.physics.arcade.enable(this.assets.heroWalkAnim);
//        this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3], 5, true);
//        this.assets.heroWalkAnim.animations.play('anim');
        
        
//        this.assets.heroWalkAnim = this.add.sprite(400, 200, 'spiderWalkAnim');
//        heroState = "walking";
//        this.game.physics.arcade.enable(this.assets.heroWalkAnim);
//        this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
//        this.assets.heroWalkAnim.animations.play('anim');
//
//        
//        this.assets.mummyWalkAnim = this.add.sprite(200, 300, 'mummyWalkAnim');
//        this.assets.mummyWalkAnim.animations.add('anim', [0, 1, 2, 3, 4, 5], 20, true);
//        this.assets.mummyWalkAnim.animations.play('anim');
//        this.game.physics.arcade.enable(this.assets.mummyWalkAnim);
//        this.assets.mummyWalkAnim.body.velocity.x =45;
//        
//        this.assets.mummyRunAnim = this.add.sprite(300, 300, 'mummyRunAnim');
//        this.assets.mummyRunAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
//        this.assets.mummyRunAnim.animations.play('anim');
//        this.game.physics.arcade.enable(this.assets.mummyRunAnim);
//        this.assets.mummyRunAnim.body.velocity.x = 10;
        
//        this.assets.mummyRiseAnim = this.add.sprite(400, 300, 'mummyRiseAnim');
//        this.assets.mummyRiseAnim.animations.add('anim', [0, 1, 2, 3, 4, 5], 5, true);
//        this.assets.mummyRiseAnim.animations.play('anim');
        
//        this.assets.mummyStandAnim = this.add.sprite(500, 300, 'mummyStandAnim');
//        this.assets.mummyStandAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
//        this.assets.mummyStandAnim.animations.play('anim');
        
//        this.assets.mummyDieAnim = this.add.sprite(600, 300, 'mummyDieAnim');
//        this.assets.mummyDieAnim.animations.add('anim', [0, 1, 2, 3, 4], 5, true);
//        this.assets.mummyDieAnim.animations.play('anim');
        
//        this.assets.mummyJogAnim = this.add.sprite(700, 300, 'mummyJogAnim');
//        this.assets.mummyJogAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 6], 12, true);
//        this.assets.mummyJogAnim.animations.play('anim');
//        this.game.physics.arcade.enable(this.assets.mummyJogAnim);
//        this.assets.mummyJogAnim.body.velocity.x =30;

        
    },
    
    
    update: function(){
//        console.log("update");
//        console.log(this.assets.heroWalkAnim);
//        if( heroState == "walking" && this.assets.heroWalkAnim.x<=700){
//            this.assets.heroWalkAnim.body.velocity.x=75;
//        }else if( heroState == "walking" && this.assets.heroWalkAnim.x>700){
//            heroState = "shooting";
//            this.assets.heroWalkAnim.body.velocity.x=0;
//            var tempX = this.assets.heroWalkAnim.x;
//            var tempY = this.assets.heroWalkAnim.y;
//            this.assets.heroWalkAnim.destroy();
//            this.assets.heroWalkAnim = this.game.add.sprite(tempX, tempY, 'spiderClimbAnim');
//            this.game.physics.arcade.enable(this.assets.heroWalkAnim);
//            anim = this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3, 4, 5], 10, false);
//            this.assets.heroWalkAnim.animations.play('anim');
//            anim.onComplete.add(function(){
//                heroState = "shootingFinished";
//            }, this);
//        }
//        
//        if (heroState == "shootingFinished"){
//            var tempX = this.assets.heroWalkAnim.x;
//            var tempY = this.assets.heroWalkAnim.y;
//            this.assets.heroWalkAnim.destroy();
//            this.assets.heroWalkAnim = this.add.sprite(tempX, tempY, 'spiderWalkAnim');
//            heroState = "walkingAgain";
//            this.game.physics.arcade.enable(this.assets.heroWalkAnim);
//            this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
//            this.assets.heroWalkAnim.animations.play('anim');
//        }
//        
//        if( heroState == "walkingAgain" && this.assets.heroWalkAnim.x<=900){
//            this.assets.heroWalkAnim.body.velocity.x=75;
//        }else if( heroState == "walkingAgain" && this.assets.heroWalkAnim.x>900){
//            heroState = "shooting";
//            this.assets.heroWalkAnim.body.velocity.x=0;
//            var tempX = this.assets.heroWalkAnim.x;
//            var tempY = this.assets.heroWalkAnim.y;
//            this.assets.heroWalkAnim.destroy();
//            this.assets.heroWalkAnim = this.game.add.sprite(tempX-42, tempY, 'spiderDieAnim');
//            this.game.physics.arcade.enable(this.assets.heroWalkAnim);
//            anim = this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3, 4, 5, 6], 10, false);
//            this.assets.heroWalkAnim.animations.play('anim');
//        }
        
        
//        if( heroState == "walking" && this.assets.heroWalkAnim.x<=700){
//            this.assets.heroWalkAnim.body.velocity.x=75;
//        }else if( heroState == "walking" && this.assets.heroWalkAnim.x>700){
//            heroState = "shooting";
//            this.assets.heroWalkAnim.body.velocity.x=0;
//            var tempX = this.assets.heroWalkAnim.x;
//            var tempY = this.assets.heroWalkAnim.y;
//            this.assets.heroWalkAnim.destroy();
//            this.assets.heroWalkAnim = this.game.add.sprite(tempX, tempY, 'heroShootAnim');
//            this.game.physics.arcade.enable(this.assets.heroWalkAnim);
//            anim = this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3], 10, false);
//            this.assets.heroWalkAnim.animations.play('anim');
//            anim.onComplete.add(function(){
//                heroState = "shootingFinished";
//            }, this);
//        }
//        
//        if (heroState == "shootingFinished"){
//            var tempX = this.assets.heroWalkAnim.x;
//            var tempY = this.assets.heroWalkAnim.y;
//            this.assets.heroWalkAnim.destroy();
//            this.assets.heroWalkAnim = this.add.sprite(tempX, tempY, 'heroWalkAnim');
//            heroState = "walkingAgain";
//            this.game.physics.arcade.enable(this.assets.heroWalkAnim);
//            this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3], 5, true);
//            this.assets.heroWalkAnim.animations.play('anim');
//        }
//        
//        if( heroState == "walkingAgain" && this.assets.heroWalkAnim.x<=900){
//            this.assets.heroWalkAnim.body.velocity.x=75;
//        }else if( heroState == "walkingAgain" && this.assets.heroWalkAnim.x>900){
//            heroState = "shooting";
//            this.assets.heroWalkAnim.body.velocity.x=0;
//            var tempX = this.assets.heroWalkAnim.x;
//            var tempY = this.assets.heroWalkAnim.y;
//            this.assets.heroWalkAnim.destroy();
//            this.assets.heroWalkAnim = this.game.add.sprite(tempX-42, tempY, 'heroDieAnim');
//            this.game.physics.arcade.enable(this.assets.heroWalkAnim);
//            anim = this.assets.heroWalkAnim.animations.add('anim', [0, 1, 2, 3], 10, false);
//            this.assets.heroWalkAnim.animations.play('anim');
//        }
    },
    
    
    //-----------------------------------------------------------------------------------------
    
    
    createRequirements: function(){
//        console.log("createRequirements");
        if(this.requirements.timer){
            this.assets.stageTimerPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.requirements.timer.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageTimerIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageTimerIcon.frame = iconsFrames.timer;
            this.assets.stageTimerPallete.addChild(this.assets.stageTimerIcon);
            
            this.assets.stageTimerText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / '+this.requirements.timer.duration, 22);
            this.assets.stageTimerText.anchor.set(0.5, 0.5);
            this.assets.stageTimerPallete.addChild(this.assets.stageTimerText);
        }
        
        if(this.requirements.coins){
             this.assets.stageCoinsPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.requirements.coins.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageCoinsIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageCoinsIcon.frame = iconsFrames.coins;
            this.assets.stageCoinsPallete.addChild(this.assets.stageCoinsIcon);
            
            this.assets.stageCoinsText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.requirements.coins.required, 22);
            this.assets.stageCoinsText.anchor.set(0.5, 0.5);
            this.assets.stageCoinsPallete.addChild(this.assets.stageCoinsText);
        }
        
        if(this.requirements.blueDiamond){
            this.assets.stageBlueDiamondPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.requirements.blueDiamond.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageBlueDiamondIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageBlueDiamondIcon.frame = iconsFrames.blueDiamond;
            this.assets.stageBlueDiamondPallete.addChild(this.assets.stageBlueDiamondIcon);
            
            this.assets.stageBlueDiamondText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.requirements.blueDiamond.required, 22);
            this.assets.stageBlueDiamondText.anchor.set(0.5, 0.5);
            this.assets.stageBlueDiamondPallete.addChild(this.assets.stageBlueDiamondText);
        }
        
        if(this.requirements.redDiamond){
            this.assets.stageRedDiamondPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.requirements.redDiamond.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageRedDiamondIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageRedDiamondIcon.frame = iconsFrames.redDiamond;
            this.assets.stageRedDiamondPallete.addChild(this.assets.stageRedDiamondIcon);
            
            this.assets.stageRedDiamondText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.requirements.redDiamond.required, 22);
            this.assets.stageRedDiamondText.anchor.set(0.5, 0.5);
            this.assets.stageRedDiamondPallete.addChild(this.assets.stageRedDiamondText);
        }
        
    },
    
    createButtons: function(){
        console.log("createButtons");
        this.assets.stageButtonsPalette = this.add.sprite(this.positions.buttonsPalette.x, this.positions.buttonsPalette.y, 'buttonsPalette');
        this.assets.stageButtonsPalette.anchor.set(0.5, 0.5);
        
        this.assets.stageHelpBtn = this.add.button(this.positions.stageHelpBtn.x, this.positions.stageHelpBtn.y, 'sceneHelpBtn', this.stageHelpClicked, this, 1, 0, 0, 0);
        this.assets.stageHelpBtn.scale.set(0.5, 0.5);
        this.assets.stageHelpBtn.anchor.set(0.5, 0.5);
        this.assets.stageButtonsPalette.addChild(this.assets.stageHelpBtn);
        
        this.assets.stageSettingBtn = this.add.button(this.positions.stageSettingBtn.x, this.positions.stageSettingBtn.y, 'sceneSettingBtn', this.stageSettingClicked, this, 1, 0, 0, 0);
        this.assets.stageSettingBtn.scale.set(0.5, 0.5);
        this.assets.stageSettingBtn.anchor.set(0.5, 0.5);
        this.assets.stageButtonsPalette.addChild(this.assets.stageSettingBtn);
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
    
    
    //-----------------------------------------------------------------------------------------
    
    
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
    
    
    stageHelpClicked: function(){
        console.log('stageHelpClicked');
        this.openHelpPalette();
    },
    
    stageSettingClicked: function(){
        console.log('stageSettingClicked');
        this.openSettingPalette();
    },
    
    helpPaletteCloseClicked: function(){
//         console.log('helpPaletteCloseClicked');
        this.closeHelpPalette();
    },
    
    settingPaletteCloseClicked: function(){
//        console.log('settingPaletteCloseClicked');
        this.closeSettingPalette();
    },
    
    settingPaletteBgMusicClicked: function(){
//        console.log('settingPaletteBgMusicClicked');
        if(globalVars.bgMusic){
            globalVars.bgMusic = false;
        }else{
            globalVars.bgMusic = true;
        }
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
        storeGameData(n, globalVars);
        this.assets.settingPaletteSoundEffectsBtn.frame = globalVars.soundEffects? 0 : 1;
    }
    
}