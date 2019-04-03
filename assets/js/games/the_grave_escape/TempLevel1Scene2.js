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
    level1: {
        map: {
            landTiles: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 21, 23, 26, 27, 32, 33],
            stairsTilesUp: [74, 82],
            stairsTilesDown: [66, 74]
        },
        heroStates: {
            STANDING: "STANDING",
            WALKING: "WALKING",
            CLIMBING_UP: "CLIMBING",
            SHOOTING: "SHOOTING"
        },
        heroDirections: {
            FORWARD: "FORWARD",
            BACKWARD: "BACKWARD",
        },
        gravity: {
            y: 100
        },
        hero: {
            startData: {
                x: 800,
                y: 200,
                direction: "FORWARD"
            },
            currentState: "",
            currentDirection: ""
        } 
    },
    
    
     preload: function(){
        console.log("preload");
    },
    
    
    create: function(){
        console.log("create");
        this.assets.spritesToDestroy = this.game.add.group();
        
        this.assets.level1Map = this.add.tilemap('level1Map');
        this.assets.level1Map.addTilesetImage('levelsTiles', 'levelsTiles');
        this.assets.level1Layer1 = this.assets.level1Map.createLayer("level1Layer1");
        this.assets.level1Layer1.x = -300;
        
        this.assets.level1Map.setCollision(addOneToArray(this.level1.map.landTiles), true, "level1Layer1", true);
        
        this.assets.level1Layer1.resizeWorld();
             
        

        
        this.assets.level1Layer2 = this.assets.level1Map.createLayer("level1Layer2");
        this.assets.level1Layer2.x = -300
        this.assets.level1Layer2.resizeWorld();
        
        
        
        this.assets.level1DoorLayer = this.assets.level1Map.objects.level1DoorLayer;
        this.assets.level1FiresLayer = this.assets.level1Map.objects.level1FiresLayer;
        this.assets.level1BoxesLayer = this.assets.level1Map.objects.level1BoxesLayer;
        this.assets.level1BarrelsLayer = this.assets.level1Map.objects.level1BarrelsLayer;
        this.assets.level1CircularVasesLayer = this.assets.level1Map.objects.level1CircularVasesLayer;
        this.assets.level1TallVasesLayer = this.assets.level1Map.objects.level1TallVasesLayer;
        
        this.createDoors(this.assets.level1DoorLayer);
        
        this.createGroups(this.assets.level1FireLayer, 'Fires', 'fire', 4);
        this.createGroups(this.assets.level1BoxesLayer, 'Boxes', 'box', 1);
        this.createGroups(this.assets.level1BarrelsLayer, 'Barrels', 'barrel', 1);
        this.createGroups(this.assets.level1CircularVasesLayer, 'CircularVases', 'circularVase', 1);
        this.createGroups(this.assets.level1TallVasesLayer, 'TallVases', 'tallVase', 1);
        
        
        
        this.createWalkingHero(this.level1.hero.startData.x, this.level1.hero.startData.y);
        this.assets.hero.animations.play('stand');
        this.level1.hero.currentState = this.level1.heroStates.STANDING;
        
        this.createOverscreenShadows();
        
        this.createRequirementsTabs();
        this.createButtons();
        this.createHelpPalette();
        this.createSettingPalette();
        
        
        
        this.activateHero();
        this.createArrowsGroup();

        
        
        this.createLevelTimer();
        
    },
    

    update: function(){
//        console.log("update");
        this.emptySpritesToDestroy();
        this.game.physics.arcade.collide(this.assets.hero, this.assets.level1Layer1);

//        this.updateOverscreenShadows();
        
        this.updateHeroPosition();
        
        this.game.physics.arcade.overlap(this.assets.arrowsGroup, this.assets.level1BoxesGroup, this.arrowHitBox.bind(this), null, this);
        this.game.physics.arcade.overlap(this.assets.arrowsGroup, this.assets.level1BarrelsGroup, this.arrowHitBox.bind(this), null, this);
        this.game.physics.arcade.overlap(this.assets.arrowsGroup, this.assets.level1CircularVasesGroup, this.arrowHitBox.bind(this), null, this);
        this.game.physics.arcade.overlap(this.assets.arrowsGroup, this.assets.level1TallVasesGroup, this.arrowHitBox.bind(this), null, this);

    },
    
    //-----------------------------------------------------------------------------------------
    createDoors: function(layer){
//        console.log("createDoors");
        var doorObj = findInArray(layer, getFrameOf('flatDoor'));
        if(doorObj){
            this.assets.door = this.game.add.sprite(doorObj.x, doorObj.y, 'flatDoorAnim');
            this.assets.door.animations.add('opening', [0, 1, 2, 3, 4, 5], 5, false);
            this.assets.door.animations.add('closed', [0], 5, false);
            this.assets.door.anchor.set(0.5, 1);
            this.assets.door.animations.play('cloased');
        }
        
        var doorSwitchObj = findInArray(layer, getFrameOf('doorSwitch'));
        if(doorSwitchObj){
            this.assets.doorSwitch = this.game.add.sprite(doorSwitchObj.x, doorSwitchObj.y, 'doorSwitchAnim');
            this.assets.doorSwitch.animations.add('opening', [0, 1, 2, 3], 5, false);
            this.assets.doorSwitch.animations.add('closeing', [3, 2, 1, 0], 5, false);
            this.assets.doorSwitch.animations.add('opened', [3], 5, false);
            this.assets.doorSwitch.animations.add('closed', [0], 5, false);
            this.assets.doorSwitch.anchor.set(0, 1);
            this.assets.doorSwitch.animations.play('closed');
//            console.log(this.game.load.getAsset('doorSwitchAnim'));
        }
        
    },
    
    
    createGroups: function(layer, groupName, singleName, AnimFrameCount){
//        console.log("createBoxes");
//        console.log(layer, groupName, singleName);
        this.assets['level1'+groupName+'Group'] = this.add.group();
        this.assets['level1'+groupName+'Group'].enableBody = true;
        if(AnimFrameCount > 1){
            var tempArray = [];
            for(var frameCount=0; frameCount<AnimFrameCount; frameCount++){
                tempArray.push(frameCount);
            }
//            console.log(tempArray);
            this.assets.level1Map.createFromObjects('level1'+groupName+'Layer', getFrameOf(singleName), singleName+"Anim", 0, true, false, this.assets['level1'+groupName+'Group']);
            this.assets['level1'+groupName+'Group'].callAll('animations.add', 'animations', 'spin', tempArray, 10, true);
            this.assets['level1'+groupName+'Group'].callAll('animations.play', 'animations', 'spin');
        }else{
           this.assets.level1Map.createFromObjects('level1'+groupName+'Layer', getFrameOf(singleName), singleName, 0, true, false, this.assets['level1'+groupName+'Group']);
        }
    },
    
    
    createWalkingHero: function(x, y){
//        console.log("createWalkingHero");
        this.assets.hero = this.game.add.sprite(x, y, 'heroWalkAnim');
        this.assets.hero.anchor.set(0.5, 1);
        this.assets.hero.animations.add('walk', [0, 1, 2, 3], 5, true);
        this.assets.hero.animations.add('stand', [0], 5, false);
        this.game.physics.arcade.enable(this.assets.hero);
        this.assets.hero.body.collideWorldBounds = true;
        this.game.camera.follow(this.assets.hero);
        this.assets.hero.body.gravity.y = this.level1.gravity.y;
    },
    
    createClimbingHero: function(x, y){
//        console.log("createClimbingHero");
        this.assets.hero = this.game.add.sprite(x, y, 'heroClimbAnim');
        this.assets.hero.anchor.set(0.5, 1);
        this.assets.hero.animations.add('climbing', [0, 1, 2, 3], 5, true);
        this.game.physics.arcade.enable(this.assets.hero);
        this.assets.hero.body.collideWorldBounds = true;
        this.game.camera.follow(this.assets.hero);
        this.assets.hero.body.gravity.y = 0;
    },
    
    createShootingHero: function(x, y){
//        console.log("createShootingHero");
        this.assets.hero = this.game.add.sprite(x, y, 'heroShootAnim');
        this.assets.hero.anchor.set(0.5, 1);
        var shooting = this.assets.hero.animations.add('Shooting', [0, 1, 2, 3], 10, false);
        this.game.physics.arcade.enable(this.assets.hero);
        this.assets.hero.body.collideWorldBounds = true;
        this.game.camera.follow(this.assets.hero);
        this.assets.hero.body.gravity.y = this.level1.gravity.y;
        return shooting;
    },
    
    changeHeroState(newState){
        
        var tempPosition = {x:this.assets.hero.x, y:this.assets.hero.y, scaleX: this.assets.hero.scale.x};
        
        if(this.level1.hero.currentState == this.level1.heroStates.STANDING || this.level1.hero.currentState == this.level1.heroStates.WALKING){
            switch(newState){
                    case(this.level1.heroStates.STANDING):
                        this.assets.hero.animations.play('stand');
                        this.level1.hero.currentState = this.level1.heroStates.STANDING;
                        break;
                    case(this.level1.heroStates.WALKING):
                        this.assets.hero.animations.play('walk');
                        this.level1.hero.currentState = this.level1.heroStates.WALKING;
                        break;
                    case(this.level1.heroStates.CLIMBING):
                        this.assets.hero.destroy();
                        this.createClimbingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('climbing');
                        this.level1.hero.currentState = this.level1.heroStates.CLIMBING;
                        break;
                    case(this.level1.heroStates.SHOOTING):
                        this.assets.hero.destroy();
                        var shooting = this.createShootingHero(tempPosition.x, tempPosition.y);
                        shooting.onComplete.add(function(){
                            this.changeHeroState(this.level1.heroStates.STANDING);
                            this.createNewArrow();
                        }, this);
                        this.assets.hero.scale.x = tempPosition.scaleX;
                        this.assets.hero.animations.play('Shooting');
                        this.level1.hero.currentState = this.level1.heroStates.SHOOTING;
                        break;
            }
        }else if(this.level1.hero.currentState == this.level1.heroStates.CLIMBING){
            switch(newState){
                    case(this.level1.heroStates.STANDING):
                        this.assets.hero.destroy();
                        this.createWalkingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('stand');
                        this.level1.hero.currentState = this.level1.heroStates.STANDING;
                        break;
                    case(this.level1.heroStates.WALKING):
                        this.assets.hero.destroy();
                        this.createWalkingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('walk');
                        this.level1.hero.currentState = this.level1.heroStates.WALKING;
                        break;
                    case(this.level1.heroStates.SHOOTING):
                        this.assets.hero.destroy();
                        this.createShootingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('Shooting');
                        this.level1.hero.currentState = this.level1.heroStates.SHOOTING;
                        this.game.time.events.add(Phaser.Timer.QUARTER, function (){
                            this.changeHeroState(this.level1.heroStates.STANDING);
                        }.bind(this));
                        break;
            }
        }else if(this.level1.hero.currentState == this.level1.heroStates.SHOOTING){
             switch(newState){
                    case(this.level1.heroStates.STANDING):
                        this.assets.hero.destroy();
                        this.createWalkingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('stand');
                        this.level1.hero.currentState = this.level1.heroStates.STANDING;
                        break;
                     case(this.level1.heroStates.WALKINGD):
                        this.assets.hero.destroy();
                        this.createWalkingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('walk');
                        this.level1.hero.currentState = this.level1.heroStates.WALKINGD;
                        break;
                     case(this.level1.heroStates.CLIMBING):
                        this.assets.hero.destroy();
                        this.createClimbingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('climbing');
                        this.level1.hero.currentState = this.level1.heroStates.CLIMBING;
                        break;
             }
        }
        
        if(this.level1.hero.currentDirection == this.level1.heroDirections.FORWARD){
            this.assets.hero.scale.x = 1;
        }else if(this.level1.hero.currentDirection == this.level1.heroDirections.BACKWARD){
            this.assets.hero.scale.x = -1;
        }
    },
    
    createArrowsGroup: function(){
        this.assets.arrowsGroup = this.game.add.group();
        this.assets.arrowsGroup.enableBody = true;
        this.assets.arrowsGroup.physicsBodyType = Phaser.Physics.ARCADE;
    },
    
    createNewArrow: function(){
        var tempArrow = this.assets.arrowsGroup.create(this.assets.hero.x, this.assets.hero.y-30, 'arrow');
        tempArrow.checkWorldBounds = true;
        tempArrow.events.onOutOfBounds.add(function(arrow){
                                           console.log("out");
            this.assets.arrowsGroup.remove(arrow);
            this.assets.spritesToDestroy.add(arrow);
        }.bind(this), this);
            if(this.level1.hero.currentDirection == this.level1.heroDirections.BACKWARD){
                tempArrow.body.velocity.x = -320;
            }else{
                tempArrow.body.velocity.x = 320;
            }
			tempArrow.scale.x = this.assets.hero.scale.x;
    },
    createOverscreenShadows: function(){
        this.assets.shadowTexture = this.add.bitmapData(this.game.width, this.game.height);      
        this.assets.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.assets.shadowTexture);    
        this.assets.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    },
    
    createRequirementsTabs: function(){
//        console.log("createRequirementsTabs");
        if(this.requirements.timer){
            this.assets.stageTimerPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.requirements.timer.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageTimerPallete.fixedToCamera = true;
            
            this.assets.stageTimerIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageTimerIcon.frame = iconsFrames.timer;
            this.assets.stageTimerPallete.addChild(this.assets.stageTimerIcon);
            
            this.assets.stageTimerText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', this.requirements.timer.duration+' / '+this.requirements.timer.duration, 22);
            this.assets.stageTimerText.anchor.set(0.5, 0.5);
            this.assets.stageTimerPallete.addChild(this.assets.stageTimerText);
        }
        
        if(this.requirements.coins){
             this.assets.stageCoinsPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.requirements.coins.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageCoinsPallete.fixedToCamera = true;
            
            this.assets.stageCoinsIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageCoinsIcon.frame = iconsFrames.coins;
            this.assets.stageCoinsPallete.addChild(this.assets.stageCoinsIcon);
            
            this.assets.stageCoinsText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.requirements.coins.required, 22);
            this.assets.stageCoinsText.anchor.set(0.5, 0.5);
            this.assets.stageCoinsPallete.addChild(this.assets.stageCoinsText);
        }
        
        if(this.requirements.blueDiamond){
            this.assets.stageBlueDiamondPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.requirements.blueDiamond.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageBlueDiamondPallete.fixedToCamera = true;
            
            this.assets.stageBlueDiamondIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageBlueDiamondIcon.frame = iconsFrames.blueDiamond;
            this.assets.stageBlueDiamondPallete.addChild(this.assets.stageBlueDiamondIcon);
            
            this.assets.stageBlueDiamondText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.requirements.blueDiamond.required, 22);
            this.assets.stageBlueDiamondText.anchor.set(0.5, 0.5);
            this.assets.stageBlueDiamondPallete.addChild(this.assets.stageBlueDiamondText);
        }
        
        if(this.requirements.redDiamond){
            this.assets.stageRedDiamondPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.requirements.redDiamond.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageRedDiamondPallete.fixedToCamera = true;
            
            this.assets.stageRedDiamondIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageRedDiamondIcon.frame = iconsFrames.redDiamond;
            this.assets.stageRedDiamondPallete.addChild(this.assets.stageRedDiamondIcon);
            
            this.assets.stageRedDiamondText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.requirements.redDiamond.required, 22);
            this.assets.stageRedDiamondText.anchor.set(0.5, 0.5);
            this.assets.stageRedDiamondPallete.addChild(this.assets.stageRedDiamondText);
        }
        
    },
    
    createButtons: function(){
//        console.log("createButtons");
        this.assets.stageButtonsPalette = this.add.sprite(this.positions.buttonsPalette.x, this.positions.buttonsPalette.y, 'buttonsPalette');
        this.assets.stageButtonsPalette.anchor.set(0.5, 0.5);
        
        this.assets.stageButtonsPalette.fixedToCamera = true;
        
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
        
        this.assets.helpPaletteBg.fixedToCamera = true;
        
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
        
         this.assets.settingPaletteBg.fixedToCamera = true;
        
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
    
    activateHero: function(){
        this.assets.keys = {};
        this.assets.keys.key_W = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.assets.keys.key_A = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.assets.keys.key_S = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.assets.keys.key_D = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.assets.keys.key_SPACEBAR = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
//        this.assets.keys = {};
//        this.assets.keys.inputKeys.upKey.onDown.add(this.upPressed, this);
//        this.assets.keys.inputKeys.spacebarKey.onDown.add(this.spacebarPressed, this);
    },

    
    createLevelTimer: function(){
        this.assets.timer = this.game.time.create(false);
        this.assets.timerCounter = 0;
        this.assets.timer.loop(1000, this.updateCounter, this);
        this.assets.timer.start();
    },
    
    updateCounter: function(){
        this.assets.timerCounter++;
        this.assets.stageTimerText.text = (this.requirements.timer.duration-this.assets.timerCounter)+' / '+this.requirements.timer.duration, 22;
//        console.log(this.assets.timerCounter);
        if(this.requirements.timer.duration == this.assets.timerCounter){
           this.assets.timer.destroy();
        }
    },
    
    //-----------------------------------------------------------------------------------------
    emptySpritesToDestroy: function(){
//        console.log("emptySpritesToDestroy");
        this.assets.spritesToDestroy.forEach(function(s){
            s.destroy();
        });
    },
    
    updateOverscreenShadows: function(){  
        this.assets.lightSprite.reset(this.game.camera.x, this.game.camera.y);
        this.assets.shadowTexture.context.fillStyle = 'rgb(0, 0, 0)';
        this.assets.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
        var heroObj = {
            x0: this.assets.hero.x - this.game.camera.x,
            y0: this.assets.hero.y - this.game.camera.y,
            radius0: (200 + this.game.rnd.integerInRange(1,10)) * 0.2,
            x1: this.assets.hero.x - this.game.camera.x,
            y1: this.assets.hero.y - this.game.camera.y,
            radius1: 200 + this.game.rnd.integerInRange(1,10),
        };
        this.updateLightFor(heroObj);
        
//        console.log(this.assets.level1FiresGroup.children[0].x);
        for(var fireCount = 0; fireCount<this.assets.level1FiresGroup.children.length; fireCount++){
            var fireObj = {
                x0: this.assets.level1FiresGroup.children[fireCount].x+40 - this.game.camera.x,
                y0: this.assets.level1FiresGroup.children[fireCount].y+40 - this.game.camera.y,
                radius0: (200 + this.game.rnd.integerInRange(1,10)) * 0.2,
                x1: this.assets.level1FiresGroup.children[fireCount].x+40 - this.game.camera.x,
                y1: this.assets.level1FiresGroup.children[fireCount].y+40 - this.game.camera.y,
                radius1: 200 + this.game.rnd.integerInRange(1,10),
            };
            this.updateLightFor(fireObj);
        }
    },
    
    
    updateLightFor: function(obj){
        // Draw circle of light with a soft edge    
        var gradient = this.assets.shadowTexture.context.createRadialGradient(obj.x0, obj.y0, obj.radius0, obj.x1, obj.y1, obj.radius1);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');    
        this.assets.shadowTexture.context.beginPath();
        this.assets.shadowTexture.context.fillStyle = gradient;    
        this.assets.shadowTexture.context.arc(obj.x1, obj.y1, obj.radius1, 0, Math.PI*2, false);
        this.assets.shadowTexture.context.fill();    
        // This just tells the engine it should update the texture cache    
        this.assets.shadowTexture.dirty = true;
    },
    
    
    updateHeroPosition:function(){
        var checkCollisionBetween = function(sprite, layer, layerTiles){
            var spritePos = {
                x: sprite.x - (sprite.width/2),
                y: sprite.y - 80,
                width: sprite.width,
                height: 80
            }
            var tempTiles = layer.getTiles(spritePos.x, spritePos.y, spritePos.width, spritePos.height, false, false);
            var tempTilesIndex = [];
            for(var val in tempTiles) {
                tempTilesIndex.push(tempTiles[val].index);
            }
            var tileNo = matchingValuesTo(tempTilesIndex, layerTiles);
            if(tileNo>=0){
                return tempTiles[tileNo];
            }
            return false;
        };
        
        var matchingValuesTo = function(arr1, arr2){
            for(var val1 in arr1) { 
                for(var val2 in arr2) {
                    if(arr1[val1] == arr2[val2]){
                        return val1;
                    }
                }
            }
            return -1;
        }
        
        var checkKeysDown = function(){
            
            var tempKeysDown = [];
            
            if(this.assets.keys.key_W.isDown){
                tempKeysDown.push("w");
            }else if(this.assets.keys.key_S.isDown){
                tempKeysDown.push("s");
            }
            
            if(this.assets.keys.key_A.isDown){
                tempKeysDown.push("a");
            }else if(this.assets.keys.key_D.isDown){
                tempKeysDown.push("d");
            }
            
            if(this.assets.keys.key_SPACEBAR.isDown){
                tempKeysDown.push("spacebar");
            }
            
            return tempKeysDown;
        }
        //-----------------------------------------------------------------------------------------------------------------------------
        var tempKeysDown = checkKeysDown.bind(this)();
        
        if(tempKeysDown.length>0){
            for(var index in tempKeysDown){
                if(tempKeysDown[index] == "a"){
                    if(this.assets.hero.body.onFloor()){
                        if(this.level1.hero.currentState !== this.level1.heroStates.WALKING || this.level1.hero.currentDirection !== this.level1.heroDirections.BACKWARD){
                            this.level1.hero.currentDirection = this.level1.heroDirections.BACKWARD;
                            this.changeHeroState(this.level1.heroStates.WALKING);
                        }else{
                            this.assets.hero.x--;
                        }
                    }else{
                        if(this.level1.hero.currentState !== this.level1.heroStates.STANDING){
                            this.changeHeroState(this.level1.heroStates.STANDING);
                        }
                    }
                }
                if(tempKeysDown[index] == "d"){
                    if(this.assets.hero.body.onFloor()){
                        if(this.level1.hero.currentState !== this.level1.heroStates.WALKING || this.level1.hero.currentDirection !== this.level1.heroDirections.FORWARD){
                            this.level1.hero.currentDirection = this.level1.heroDirections.FORWARD;
                            this.changeHeroState(this.level1.heroStates.WALKING);
                        }else{
                            this.assets.hero.x++;
                        }
                    }else{
                        if(this.level1.hero.currentState !== this.level1.heroStates.STANDING){
                            this.changeHeroState(this.level1.heroStates.STANDING);
                        }
                    }   
                }
                if(tempKeysDown[index] == "w"){
                    var tile = checkCollisionBetween(this.assets.hero, this.assets.level1Layer2, addOneToArray(this.level1.map.stairsTilesUp));
                    if(tile){
                        if(this.level1.hero.currentState !== this.level1.heroStates.CLIMBING){
                            this.changeHeroState(this.level1.heroStates.CLIMBING);
                        }else{
                            this.assets.hero.x = tile.worldX+40;
                            this.assets.hero.y--;
                        }
                    }
                }
                if(tempKeysDown[index] == "s"){
                    var tile = checkCollisionBetween(this.assets.hero, this.assets.level1Layer2, addOneToArray(this.level1.map.stairsTilesDown));
                    if(tile){
                        if(this.level1.hero.currentState !== this.level1.heroStates.CLIMBING){
                            this.changeHeroState(this.level1.heroStates.CLIMBING);
                        }else{
                            this.assets.hero.x = tile.worldX+40;
                            this.assets.hero.y++;
                        }
                    }
                }
                if(tempKeysDown[index] == "spacebar"){
                    if(this.level1.hero.currentState !== this.level1.heroStates.SHOOTING){
                        this.changeHeroState(this.level1.heroStates.SHOOTING);
                    }
                }
            }
        }else{
            if(this.level1.hero.currentState !== this.level1.heroStates.STANDING && this.level1.hero.currentState !== this.level1.heroStates.SHOOTING){
                this.changeHeroState(this.level1.heroStates.STANDING);
            }
        }
    },
    
    
    arrowHitBox: function(arrow, box){
        console.log("arrowHitBox");
        console.log(this);
//        console.log(arrow, box);
        this.assets.level1BoxesGroup.remove(box);
        this.assets.spritesToDestroy.add(box);
        this.assets.arrowsGroup.remove(arrow);
        this.assets.spritesToDestroy.add(arrow);
//        box.destroy();
//        arrow.destroy();
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

