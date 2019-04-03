var Level1Scene = {
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    
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
        },
        gameOverPaletteCloseBtn:{
            x: -110,
            y: 85
        },
        gameOverPaletteReplayBtn:{
            x: 110,
            y: 85
        },
        youWonPaletteCloseBtn:{
            x: -110,
            y: 110
        },
        youWonPaletteNextBtn:{
            x: 110,
            y: 110
        },
        youWonPaletteBoxs:{
            leftX: -75,
            rightX: 75,
            startY: -60,
            yInc: 45
        },
        youWonPaletteBoxsIcon:{
            x: 40,
            y: 0,
        },
        youWonPaletteBoxsText:{
                x: -20,
                y: 7,
        },
        youWonPaletteTotalPointsText:{
            x: -67,
            y: 45,
        }
    },
    
    
    level1: {},
    
    
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    preload: function(){
//        console.log("preload");
    },
    
    
    create: function(){
//        console.log("create");
        
        this.level1 = this.getDefaults();
        
        this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);
        
        this.assets.level1Map = this.add.tilemap('level1Map');
        
        this.assets.level1Map.addTilesetImage('levelsTiles', 'levelsTiles');
        this.assets.level1Map.addTilesetImage('levelsSlopes', 'arcade-slopes-80');
        
        this.assets.layers = {};
        this.assets.groups = {};
        
        this.assets.layers.slops = this.assets.level1Map.createLayer('level1Slops');
        this.assets.layers.slops.x = -300;
        this.assets.layers.slops.resizeWorld();
        this.assets.layers.slops.debug = true;
        this.game.slopes.convertTilemapLayer(this.assets.layers.slops, 'arcadeslopes', 89);
        
        this.assets.layers.enemyStoppers = this.assets.level1Map.createLayer("level1EnemyStoppers");
        this.assets.layers.enemyStoppers.x = -300;
        this.assets.layers.enemyStoppers.resizeWorld();
        
        this.assets.layers.enemiesGenerators = this.assets.level1Map.objects.level1EnemiesGenerators;
        this.createGroups(this.assets.layers.enemiesGenerators, 'EnemiesGenerators', 'enemiesGenerator', 1);
                
        this.assets.layers.background = this.assets.level1Map.createLayer("level1Background");
        this.assets.layers.background.x = -300;
        this.assets.layers.background.resizeWorld();

        this.assets.level1Map.setCollision(addOneToArray(this.level1.map.landTiles), true, "level1Background", true);
        this.assets.level1Map.setCollisionBetween(89, 127);
        this.assets.level1Map.setCollision(addOneToArray([83]), true, "level1EnemyStoppers", true);
        
        this.assets.layers.door = this.assets.level1Map.objects.level1Door;
        this.assets.layers.fires = this.assets.level1Map.objects.level1Fires;
        this.assets.layers.boxes = this.assets.level1Map.objects.level1Boxes;
        this.assets.layers.barrels = this.assets.level1Map.objects.level1Barrels;
        this.assets.layers.circularVases = this.assets.level1Map.objects.level1CircularVases;
        this.assets.layers.tallVases = this.assets.level1Map.objects.level1TallVases;
        
//        console.log(this.assets.layers.enemiesGenerators);
        
        this.createDoors(this.assets.layers.door);
        
        this.createGroups(this.assets.layers.fires, 'Fires', 'fire', 1);
        
        this.createGroups(this.assets.layers.boxes, 'Boxes', 'box', 1);
//        console.log(this.assets.groups.boxes.length);
        
        this.createGroups(this.assets.layers.barrels, 'Barrels', 'barrel', 1);
//        console.log(this.assets.groups.barrels.length);
        
        this.createGroups(this.assets.layers.circularVases, 'CircularVases', 'circularVase', 1);
//        console.log(this.assets.groups.circularVases.length);
        
        this.createGroups(this.assets.layers.tallVases, 'TallVases', 'tallVase', 1);
//        console.log(this.assets.groups.tallVases.length);
        
        this.assets.layers.ladders = this.assets.level1Map.createLayer("level1Ladders");
        this.assets.layers.ladders.x = -300
        this.assets.layers.ladders.resizeWorld();
        
        
        this.assets.groups.collectableItems = this.game.add.group();
        this.assets.groups.explosions = this.game.add.group();
        this.assets.groups.spritesToDestroy = this.game.add.group();
        

        
        this.assets.groups.mummies = this.game.add.group();
        this.assets.groups.dyingMummies = this.game.add.group();
        
        this.createArrowsGroup();
        
        this.createWalkingHero(this.level1.hero.startData.x, this.level1.hero.startData.y);
        this.assets.hero.animations.play('stand');
        this.level1.hero.currentState = this.level1.heroStates.STANDING;
        
        
        
        this.createOverscreenShadows();

        
        this.activateHero();
        
        this.createRequirementsTabs();
        this.createButtons();
        this.createHelpPalette();
        this.createSettingPalette();
        this.createGameOverPalette();
        this.createYouWonPalette();
        
        this.createLevelTimer();
        
        this.activateEnemiesGenerators();
//        console.log(globalVars.levels);
        
        this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.fadeOut(4000);
        this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.fadeIn(4000);
    },

    update: function(){
//        console.log("update");
//        console.log(this.assets.hero.y);
//        console.log(this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.volume);
        this.assets.hero.body.velocity.x = 0;
        
        this.updateMummiesVelocity();
        
        
        this.emptySpritesToDestroy();
//        
//        console.log(this.assets.hero.body)
        this.game.physics.arcade.collide(this.assets.hero, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.hero, this.assets.layers.background);
        
        this.game.physics.arcade.collide(this.assets.groups.boxes, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.groups.boxes, this.assets.layers.background);
        
        this.game.physics.arcade.collide(this.assets.groups.barrels, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.groups.barrels, this.assets.layers.background);
        
        this.game.physics.arcade.collide(this.assets.groups.circularVases, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.groups.circularVases, this.assets.layers.background);
        
        this.game.physics.arcade.collide(this.assets.groups.tallVases, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.groups.tallVases, this.assets.layers.background);
        
        this.game.physics.arcade.collide(this.assets.groups.collectableItems, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.groups.collectableItems, this.assets.layers.background);
        
        this.game.physics.arcade.collide(this.assets.groups.mummies, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.groups.mummies, this.assets.layers.background);
        this.game.physics.arcade.collide(this.assets.groups.mummies, this.assets.layers.enemyStoppers);
        
        this.game.physics.arcade.collide(this.assets.groups.dyingMummies, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.groups.dyingMummies, this.assets.layers.background);
        
        this.game.physics.arcade.collide(this.assets.groups.boxes, this.assets.groups.boxes);
        this.game.physics.arcade.collide(this.assets.groups.boxes, this.assets.groups.barrels);
        this.game.physics.arcade.collide(this.assets.groups.boxes, this.assets.groups.circularVases);
        this.game.physics.arcade.collide(this.assets.groups.boxes, this.assets.groups.tallVases);
        
        this.game.physics.arcade.collide(this.assets.groups.barrels, this.assets.groups.barrels);
        this.game.physics.arcade.collide(this.assets.groups.barrels, this.assets.groups.circularVases);
        this.game.physics.arcade.collide(this.assets.groups.barrels, this.assets.groups.tallVases);
        
        this.game.physics.arcade.collide(this.assets.groups.circularVases, this.assets.groups.circularVases);
        this.game.physics.arcade.collide(this.assets.groups.circularVases, this.assets.groups.tallVases);
        
        this.game.physics.arcade.collide(this.assets.groups.tallVases, this.assets.groups.tallVases);

        this.game.physics.arcade.collide(this.assets.groups.boxes, this.assets.layers.slops);
        this.game.physics.arcade.collide(this.assets.groups.boxes, this.assets.layers.background);
        
        this.updateHeroPosition();
        
        this.updateMummiesDirection();
        
        this.game.physics.arcade.overlap(this.assets.groups.arrows, this.assets.groups.boxes, this.arrowHitObject.bind(this), null, this);
        this.game.physics.arcade.overlap(this.assets.groups.arrows, this.assets.groups.barrels, this.arrowHitObject.bind(this), null, this);
        this.game.physics.arcade.overlap(this.assets.groups.arrows, this.assets.groups.circularVases, this.arrowHitObject.bind(this), null, this);
        this.game.physics.arcade.overlap(this.assets.groups.arrows, this.assets.groups.tallVases, this.arrowHitObject.bind(this), null, this);
        this.game.physics.arcade.overlap(this.assets.groups.arrows, this.assets.groups.mummies, this.arrowHitMummy.bind(this), null, this);
        if(!this.level1.heroIsOnTheDoor){
            if(this.level1.hero.currentState!==this.level1.heroStates.DYING_BY_SPIKES && this.level1.hero.currentState!==this.level1.heroStates.DYING_TO_BE_MUMMY && this.level1.hero.currentState!==this.level1.heroStates.RISING_AS_MUMMY && this.level1.hero.currentState!==this.level1.heroStates.MUMMY_STANDING){
                this.game.physics.arcade.overlap(this.assets.groups.collectableItems, this.assets.hero, this.heroCollect.bind(this), null, this);
                this.game.physics.arcade.overlap(this.assets.groups.mummies, this.assets.hero, this.mummyHitHero.bind(this), this.mummyHitHeroCheck.bind(this), this);
                this.game.physics.arcade.overlap(this.assets.door, this.assets.hero, this.heroIsOnTheDoor.bind(this), null, this);
            }
        }
        
        this.checkSpikesCollidHero();
        
        this.updateCollectableItems();
        var checkAllCollected = this.checkAllCollected();
        if(checkAllCollected){
            if(this.level1.doorStatus == 'OFF'){
                this.level1.doorStatus = 'ON';
                this.game.time.events.add(Phaser.Timer.QUARTER, function (){
                    this.openTheDoor();
                }.bind(this));
            }
        }
        this.updateOverscreenShadows(checkAllCollected);
    },
    
    render: function(){
//        this.assets.groups.mummies.forEach(function(e){
//            this.game.debug.body(e);
//        }.bind(this))
//        this.game.debug.body(this.assets.groups.mummies);
//        this.game.debug.body(this.assets.hero);
//        this.game.debug.bodyInfo(this.assets.hero, 100, 100, "white");
//        
//        this.game.debug.spriteBounds(this.assets.hero);
//        this.game.debug.spriteCorners(this.assets.hero, true, true);
    },
    
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    getDefaults: function(){
        return {
            requirements: {
                timer: {
                    index: 0,
                    totalDuration: 1000,
                    counted: 0,
                },
                coins: {
                    index: 1,
                    required: 5,
                    collected: 0,
                },
                blueDiamonds: {
                    index: 2,
                    required: 5,
                    collected: 0,
                },
                redDiamonds: {
                    index: 3,
                    required: 5,
                    collected: 0,
                }        
            },
            map: {
                landTiles: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 21, 23, 24, 26, 27, 32, 33],
                stairsTilesUp: [74, 82],
                stairsTilesDown: [66, 74],
                spikesTiles: [67, 68, 71]
            },
            heroStates: {
                STANDING: "STANDING",
                WALKING: "WALKING",
                CLIMBING: "CLIMBING",
                SHOOTING: "SHOOTING",
                DYING_TO_BE_MUMMY: "DYING_TO_BE_MUMMY",
                RISING_AS_MUMMY: "RISING_AS_MUMMY",
                MUMMY_STANDING: "MUMMY_STANDING",
                DYING_BY_SPIKES: "DYING_BY_SPIKES"
            },
            heroSpeed:{
                x: 1.5,
                y: 1.5
            },
            characterDirections: {
                FORWARD: "FORWARD",
                BACKWARD: "BACKWARD",
            },
            gravity: {
                y: 350
            },
            hero: {
                startData: {
                    x: 1120, //760,
                    y: 640, //480,
                    
                    direction: "FORWARD"
                },
                currentState: "",
                currentDirection: ""
            },
            fireStatus: 'OFF',
            doorStatus: 'OFF',
            heroIsOnTheDoor: false,
            items: {
                velocity: {
                    x: -60,
                    y: -400,
                    randomX: 120,
                    randomY: -50
                }
            },
            boxes: {
                coins: [0, 3, 2 ,5], //--10
                blueDiamond: [1, 4, 2 ,0], //--7
                redDiamond: [2, 1, 0 ,3], //--6
            },
            barrels: {
                coins: [1, 3, 5 ,2], //--11
                blueDiamond: [0, 3, 1 ,4], //--8
                redDiamond: [2, 0, 4 ,8], //--12
            },
            circularVases: {
                coins: [0 ,2 ,1 ,0, 2], //--5
                blueDiamond: [2 ,1 ,3 ,2, 4], //--12
                redDiamond: [0 ,4 ,1 ,5, 0], //--10
            },
            tallVases: {
                coins: [2 ,2 ,1 ,1, 3], //--9
                blueDiamond: [3 ,0 ,1 ,1, 4], //--9
                redDiamond: [5, 0, 2 ,3, 0], //--10
            },
            mummiesGenerators: [
                {
                    enabeled: true,
                    delay: 4500
                },
                {
                    enabeled: true,
                    delay: 6500
                },
                {
                    enabeled: true,
                    delay: 8000
                },
                {
                    enabeled: true,
                    delay: 2000
                }
            ]
        }
    },
    
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
    
    
    createGroups: function(layer, groupLayerName, singleName, AnimFrameCount){
//        console.log("createBoxes");
//        console.log(layer, groupLayerName, singleName);
        var groupName = groupLayerName.charAt(0).toLowerCase() + groupLayerName.slice(1);
        this.assets.groups[groupName] = this.add.group();
        this.assets.groups[groupName].enableBody = true;
        if(AnimFrameCount > 1){
            var tempArray = [];
            for(var frameCount=0; frameCount<AnimFrameCount; frameCount++){
                tempArray.push(frameCount);
            }
//            console.log(tempArray);
            if(singleName !== 'fire'){
                this.assets.level1Map.createFromObjects('level1'+groupLayerName, getFrameOf(singleName), singleName+"Anim", 0, true, false, this.assets.groups[groupName]);
                this.assets.groups[groupName].callAll('animations.add', 'animations', 'spin', tempArray, 10, true);
                this.assets.groups[groupName].callAll('animations.play', 'animations', 'spin');
            }else if(singleName == 'fire'){
                
                this.assets.level1Map.createFromObjects('level1'+groupLayerName, getFrameOf(singleName), singleName, 0, true, false, this.assets.groups[groupName]);
            }
        }else{
           this.assets.level1Map.createFromObjects('level1'+groupLayerName, getFrameOf(singleName), singleName, 0, true, false, this.assets.groups[groupName]);
        }
        
        if(singleName != 'fire' && singleName != 'enemiesGenerator'){
//            console.log(groupName, this.assets.groups[groupName].length);
//            console.log(this.level1[groupName].coins.length);
            this.assets.groups[groupName].forEach(function(item){
//                console.log(item);
                item.contents = {
                    coins: this.level1[groupName].coins.pop(),
                    blueDiamonds: this.level1[groupName].blueDiamond.pop(),
                    redDiamonds: this.level1[groupName].redDiamond.pop(),
                };
                item.body.gravity.y = this.level1.gravity.y;
//                console.log(item.contents.coins);
            }.bind(this))
        }

    },
    
    createArrowsGroup: function(){
        this.assets.groups.arrows = this.game.add.group();
        this.assets.groups.arrows.enableBody = true;
        this.assets.groups.arrows.physicsBodyType = Phaser.Physics.ARCADE;
    },
    
    createWalkingHero: function(x, y){
//        console.log("createWalkingHero");
        this.assets.hero = this.game.add.sprite(x, y, 'heroWalkAnim');
        this.assets.hero.anchor.set(0.5, 1);
        this.assets.hero.animations.add('walk', [0, 1, 2, 3], 5, true);
        this.assets.hero.animations.add('stand', [0], 5, false);
        this.game.physics.arcade.enable(this.assets.hero);
        this.game.slopes.enable(this.assets.hero);
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
        this.game.slopes.enable(this.assets.hero);
        this.assets.hero.body.collideWorldBounds = true;
        this.game.camera.follow(this.assets.hero);
        this.assets.hero.body.gravity.y = 0;
    },
    
    createShootingHero: function(x, y){
//        console.log("createShootingHero");
        this.assets.hero = this.game.add.sprite(x, y, 'heroShootAnim');
        this.assets.hero.anchor.set(0.5, 1);
        var shooting = this.assets.hero.animations.add('shooting', [0, 1, 2, 3], 10, false);
        this.game.physics.arcade.enable(this.assets.hero);
        this.game.slopes.enable(this.assets.hero);
        this.assets.hero.body.collideWorldBounds = true;
        this.game.camera.follow(this.assets.hero);
        this.assets.hero.body.gravity.y = this.level1.gravity.y;
//        console.log(this.assets.hero.animations.currentAnim);
        return shooting;
    },
    
    createDyingHero: function(x, y){
//        console.log("createDyingHero");
        this.assets.hero = this.game.add.sprite(x, y, 'heroDieAnim');
        this.assets.hero.anchor.set(0.5, 1);
        var dying = this.assets.hero.animations.add('dying', [0, 1, 2, 2], 5, false);
        this.game.physics.arcade.enable(this.assets.hero);
        this.game.slopes.enable(this.assets.hero);
        this.assets.hero.body.collideWorldBounds = true;
        this.game.camera.follow(this.assets.hero);
        this.assets.hero.body.gravity.y = this.level1.gravity.y;
        return dying;
    },
    
    
    
    createRisingMummyHero: function(x, y, generatorID, direction){
//        console.log("createRisingMummyHero");
        if(this.level1.hero.currentDirection == this.level1.characterDirections.FORWARD){
            x += 9;
        }else if(this.level1.hero.currentDirection == this.level1.characterDirections.BACKWARD){
            x -= 9; 
        }
        this.assets.hero = this.game.add.sprite(x, y, 'heroRiseAsMummyAnim');
        this.assets.hero.anchor.set(0.5, 1);
        var rising = this.assets.hero.animations.add('rising', [0, 1, 0, 1, 0, 1, 2, 3, 4], 10, false);
        this.game.physics.arcade.enable(this.assets.hero);
        this.game.slopes.enable(this.assets.hero);
        this.assets.hero.body.collideWorldBounds = true;
        this.game.camera.follow(this.assets.hero);
        this.assets.hero.body.gravity.y = this.level1.gravity.y;
        return rising;
    },
    
    createStadingMummyHero: function(x, y, generatorID, direction){
//        console.log("createStadingMummyHero");
        if(this.level1.hero.currentDirection == this.level1.characterDirections.FORWARD){
            x += 9;
        }else if(this.level1.hero.currentDirection == this.level1.characterDirections.BACKWARD){
            x -= 9; 
        }
        this.assets.hero = this.game.add.sprite(x, y, 'mummyStandAnim');
        this.assets.hero.anchor.set(0.5, 1);
        var standing = this.assets.hero.animations.add('standing', [0, 1, 2, 3, 4, 5], 5, true);
        this.game.physics.arcade.enable(this.assets.hero);
        this.game.slopes.enable(this.assets.hero);
        this.assets.hero.body.collideWorldBounds = true;
//        this.game.camera.follow(this.assets.hero);
        this.assets.hero.body.gravity.y = this.level1.gravity.y;
        return standing;
    },
    
    createOverscreenShadows: function(){
        this.assets.shadowTexture = this.add.bitmapData(this.game.width, this.game.height);      
        this.assets.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.assets.shadowTexture);    
        this.assets.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    },
    
    createRequirementsTabs: function(){
//        console.log("createRequirementsTabs");
        if(this.level1.requirements.timer){
            this.assets.stageTimerPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.level1.requirements.timer.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageTimerPallete.fixedToCamera = true;
            
            this.assets.stageTimerIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageTimerIcon.frame = iconsFrames.timer;
            this.assets.stageTimerPallete.addChild(this.assets.stageTimerIcon);
            
            this.assets.stageTimerText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', this.level1.requirements.timer.totalDuration+' / '+this.level1.requirements.timer.totalDuration, 22);
            this.assets.stageTimerText.anchor.set(0.5, 0.5);
            this.assets.stageTimerPallete.addChild(this.assets.stageTimerText);
        }
        
        if(this.level1.requirements.coins){
             this.assets.stageCoinsPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.level1.requirements.coins.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageCoinsPallete.fixedToCamera = true;
            
            this.assets.stageCoinsIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageCoinsIcon.frame = iconsFrames.coins;
            this.assets.stageCoinsPallete.addChild(this.assets.stageCoinsIcon);
            
            this.assets.stageCoinsText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.level1.requirements.coins.required, 22);
            this.assets.stageCoinsText.anchor.set(0.5, 0.5);
            this.assets.stageCoinsPallete.addChild(this.assets.stageCoinsText);
        }
        
        if(this.level1.requirements.blueDiamonds){
            this.assets.stageBlueDiamondsPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.level1.requirements.blueDiamonds.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageBlueDiamondsPallete.fixedToCamera = true;
            
            this.assets.stageBlueDiamondsIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageBlueDiamondsIcon.frame = iconsFrames.blueDiamond;
            this.assets.stageBlueDiamondsPallete.addChild(this.assets.stageBlueDiamondsIcon);
            
            this.assets.stageBlueDiamondsText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.level1.requirements.blueDiamonds.required, 22);
            this.assets.stageBlueDiamondsText.anchor.set(0.5, 0.5);
            this.assets.stageBlueDiamondsPallete.addChild(this.assets.stageBlueDiamondsText);
        }
        
        if(this.level1.requirements.redDiamonds){
            this.assets.stageRedDiamondPallete = this.game.add.sprite(this.positions.stagePalletes.startX, this.positions.stagePalletes.startY+(this.level1.requirements.redDiamonds.index*this.positions.stagePalletes.distance), 'iconsPalette');
            
            this.assets.stageRedDiamondPallete.fixedToCamera = true;
            
            this.assets.stageRedDiamondsIcon = this.game.add.sprite(this.positions.stageIcons.startX, this.positions.stageIcons.startY, 'levelIcons');
            this.assets.stageRedDiamondsIcon.frame = iconsFrames.redDiamond;
            this.assets.stageRedDiamondPallete.addChild(this.assets.stageRedDiamondsIcon);
            
            this.assets.stageRedDiamondsText = this.add.bitmapText(this.positions.stageText.startX, this.positions.stageText.startY, 'bahijFirasBold', '0 / ' + this.level1.requirements.redDiamonds.required, 22);
            this.assets.stageRedDiamondsText.anchor.set(0.5, 0.5);
            this.assets.stageRedDiamondPallete.addChild(this.assets.stageRedDiamondsText);
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
    
    stageHelpClicked: function(){
//        console.log('stageHelpClicked');
        this.openHelpPalette();
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    checkZposition: function(tempSprite){
        this.assets.groups.fires.forEach(function(fire) {
            if(fire.z > tempSprite.z){
                this.game.world.swap(fire, tempSprite);
            }
        }.bind(this));
        if(this.assets.hero.z > tempSprite.z){
            this.game.world.swap(this.assets.hero, tempSprite);
        }
    },
    
    openHelpPalette: function(){
        if ((this.tween && this.tween.isRunning) || this.assets.helpPaletteBg.alpha === 1){
            return;
        }else{
            this.deactivateHero();
            this.assets.helpPaletteBg.inputEnabled = true;
            this.assets.helpPaletteCloseBtn.inputEnabled = true;
            this.checkZposition(this.assets.helpPaletteBg);
            this.tween = this.add.tween(this.assets.helpPaletteBg).to({alpha: 1}, 500, Phaser.Easing.Cubic.Out, true);
        }
    },
    
    
    closeHelpPalette: function(){
        if ((this.tween && this.tween.isRunning) || this.assets.helpPaletteBg.alpha === 0){
            return;
        } else{
            this.activateHero();
            this.assets.helpPaletteBg.inputEnabled = false;
            this.assets.helpPaletteCloseBtn.inputEnabled = false;
            this.tween = this.add.tween(this.assets.helpPaletteBg).to({alpha: 0}, 100, Phaser.Easing.Cubic.In, true);
        }
    },
    
    stageSettingClicked: function(){
//        console.log('stageSettingClicked');
        this.openSettingPalette();
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    openSettingPalette: function(){
        if ((this.tween && this.tween.isRunning) || this.assets.settingPaletteBg.alpha === 1){
            return;
        }else{
            this.deactivateHero();
            this.assets.settingPaletteBg.inputEnabled = true;
            this.assets.settingPaletteCloseBtn.inputEnabled = true;
            this.assets.settingPaletteBgMusicBtn.inputEnabled = true;
            this.assets.settingPaletteSoundEffectsBtn.inputEnabled = true;
            this.checkZposition(this.assets.settingPaletteBg);
            this.tween = this.add.tween(this.assets.settingPaletteBg).to({alpha: 1}, 500, Phaser.Easing.Cubic.Out, true);
        }
    },
    
     closeSettingPalette: function(){
//            console.log('closeSettingPalette');
        if ((this.tween && this.tween.isRunning) || this.assets.settingPaletteBg.alpha === 0){
            return;
        } else{
            this.activateHero();
            this.assets.settingPaletteBg.inputEnabled = false;
            this.assets.settingPaletteCloseBtn.inputEnabled = false;
            this.assets.settingPaletteBgMusicBtn.inputEnabled = false;
            this.assets.settingPaletteSoundEffectsBtn.inputEnabled = false;
            this.tween = this.add.tween(this.assets.settingPaletteBg).to({alpha: 0}, 100, Phaser.Easing.Cubic.In, true);
        }
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
    
    helpPaletteCloseClicked: function(){
//         console.log('helpPaletteCloseClicked');
        this.closeHelpPalette();
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
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
        if(globalVars.bgMusic && (this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.volume > 0 || this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.volume < 1)){
            this.game.state.states.StartScene.musicAssets.mainBackgroundMusic.volume = 0;
            this.game.state.states.StartScene.musicAssets.levelsBackgroundMusic.volume = 1;
        }
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
        storeGameData(n, globalVars);
        this.assets.settingPaletteBgMusicBtn.frame = globalVars.bgMusic? 0 : 1;
    },
    
    settingPaletteSoundEffectsClicked: function(){
        console.log('settingPaletteSoundEffectsClicked');
        console.log(globalVars.soundEffects);
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
    
    openGameOverPalette: function(){
        if ((this.tween && this.tween.isRunning) || this.assets.gameOverPaletteBg.alpha === 1){
            return;
        }else{
            this.deactivateHero();
            this.assets.gameOverPaletteBg.inputEnabled = true;
            this.assets.gameOverPaletteCloseBtn.inputEnabled = true;
            this.assets.gameOverPaletteReplayBtn.inputEnabled = true;
            this.checkZposition(this.assets.gameOverPaletteBg);
            this.tween = this.add.tween(this.assets.gameOverPaletteBg).to({alpha: 1}, 500, Phaser.Easing.Cubic.Out, true);
        }
    },
    
    
    createGameOverPalette: function(){
        this.assets.gameOverPaletteBg = game.add.graphics(0, 0);
        this.assets.gameOverPaletteBg.beginFill(0x000000, 0.8);
        this.assets.gameOverPaletteBg.drawRect(0, 0, config.width, config.height);
        this.assets.gameOverPaletteBg.endFill();
        this.assets.gameOverPaletteBg.inputEnabled = false;
        this.assets.gameOverPaletteBg.alpha = 0;
        
        this.assets.gameOverPaletteBg.fixedToCamera = true;
        
        this.assets.gameOverPalette = this.game.add.sprite(config.width/2, config.height/2, 'gameOverPalette');
        this.assets.gameOverPalette.anchor.set(0.5, 0.5);
        this.assets.gameOverPaletteBg.addChild(this.assets.gameOverPalette);
        
        this.assets.gameOverPaletteCloseBtn = this.add.button(this.positions.gameOverPaletteCloseBtn.x, this.positions.gameOverPaletteCloseBtn.y, 'palettesCloseBtn', this.gameOverPaletteCloseClicked, this, 1, 0, 0, 0);
        this.assets.gameOverPaletteCloseBtn.anchor.set(0.5, 0.5);
        this.assets.gameOverPaletteCloseBtn.inputEnabled = false;
        this.assets.gameOverPalette.addChild(this.assets.gameOverPaletteCloseBtn);
        
        this.assets.gameOverPaletteReplayBtn = this.add.button(this.positions.gameOverPaletteReplayBtn.x, this.positions.gameOverPaletteReplayBtn.y, 'palettesReplayBtn', this.gameOverPaletteReplayClicked, this, 1, 0, 0, 0);
        this.assets.gameOverPaletteReplayBtn.anchor.set(0.5, 0.5);
        this.assets.gameOverPaletteReplayBtn.inputEnabled = false;
        this.assets.gameOverPalette.addChild(this.assets.gameOverPaletteReplayBtn);
    },
    
    gameOverPaletteCloseClicked: function(){
//        console.log('gameOverPaletteCloseClicked');
        this.game.state.start('LevelsScene');
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    gameOverPaletteReplayClicked: function(){
//        console.log('gameOverPaletteReplayClicked');
        this.game.state.start('Level1Scene');
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    openYouWonPalette: function(){
        if ((this.tween && this.tween.isRunning) || this.assets.youWonPaletteBg.alpha === 1){
            return;
        }else{
            this.deactivateHero();
            this.assets.youWonPaletteBg.inputEnabled = true;
            this.assets.youWonPaletteCloseBtn.inputEnabled = true;
            this.assets.youWonPaletteNextBtn.inputEnabled = true;
            this.checkZposition(this.assets.youWonPaletteBg);
            this.tween = this.add.tween(this.assets.youWonPaletteBg).to({alpha: 1}, 500, Phaser.Easing.Cubic.Out, true);
        }
    },
    
    createYouWonPalette: function(){
        this.assets.youWonPaletteBg = game.add.graphics(0, 0);
        this.assets.youWonPaletteBg.beginFill(0x000000, 0.8);
        this.assets.youWonPaletteBg.drawRect(0, 0, config.width, config.height);
        this.assets.youWonPaletteBg.endFill();
        this.assets.youWonPaletteBg.inputEnabled = false;
        this.assets.youWonPaletteBg.alpha = 0;

        this.assets.youWonPaletteBg.fixedToCamera = true;

        this.assets.youWonPalette = this.game.add.sprite(config.width/2, config.height/2, 'youWonPalette');
        this.assets.youWonPalette.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteBg.addChild(this.assets.youWonPalette);

        this.assets.youWonPaletteTimerBox = this.game.add.sprite(this.positions.youWonPaletteBoxs.leftX, this.positions.youWonPaletteBoxs.startY, 'scorePalette');
        this.assets.youWonPaletteTimerBox.anchor.set(0.5, 0.5);
        this.assets.youWonPalette.addChild(this.assets.youWonPaletteTimerBox);

        this.assets.youWonPaletteTimerIcon = this.game.add.sprite(this.positions.youWonPaletteBoxsIcon.x, this.positions.youWonPaletteBoxsIcon.y, 'levelIcons');
        this.assets.youWonPaletteTimerIcon.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteTimerIcon.frame = iconsFrames.timer;
        this.assets.youWonPaletteTimerBox.addChild(this.assets.youWonPaletteTimerIcon);

        this.assets.youWonPaletteTimerText = this.add.bitmapText(this.positions.youWonPaletteBoxsText.x, this.positions.youWonPaletteBoxsText.y, 'bahijFirasBold', '0', 22);
        this.assets.youWonPaletteTimerText.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteTimerBox.addChild(this.assets.youWonPaletteTimerText);

        this.assets.youWonPaletteCoinsBox = this.game.add.sprite(this.positions.youWonPaletteBoxs.rightX, this.positions.youWonPaletteBoxs.startY, 'scorePalette');
        this.assets.youWonPaletteCoinsBox.anchor.set(0.5, 0.5);
        this.assets.youWonPalette.addChild(this.assets.youWonPaletteCoinsBox);

        this.assets.youWonPaletteCoinsIcon = this.game.add.sprite(this.positions.youWonPaletteBoxsIcon.x, this.positions.youWonPaletteBoxsIcon.y, 'levelIcons');
        this.assets.youWonPaletteCoinsIcon.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteCoinsIcon.frame = iconsFrames.coins;
        this.assets.youWonPaletteCoinsBox.addChild(this.assets.youWonPaletteCoinsIcon);

        this.assets.youWonPaletteCoinsText = this.add.bitmapText(this.positions.youWonPaletteBoxsText.x, this.positions.youWonPaletteBoxsText.y, 'bahijFirasBold', '0', 22);
        this.assets.youWonPaletteCoinsText.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteCoinsBox.addChild(this.assets.youWonPaletteCoinsText);
         
        this.assets.youWonPaletteBlueDiamondsBox = this.game.add.sprite(this.positions.youWonPaletteBoxs.leftX, this.positions.youWonPaletteBoxs.startY+this.positions.youWonPaletteBoxs.yInc, 'scorePalette');
        this.assets.youWonPaletteBlueDiamondsBox.anchor.set(0.5, 0.5);
        this.assets.youWonPalette.addChild(this.assets.youWonPaletteBlueDiamondsBox);

        this.assets.youWonPaletteTimerIcon = this.game.add.sprite(this.positions.youWonPaletteBoxsIcon.x, this.positions.youWonPaletteBoxsIcon.y, 'levelIcons');
        this.assets.youWonPaletteTimerIcon.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteTimerIcon.frame = iconsFrames.blueDiamond;
        this.assets.youWonPaletteBlueDiamondsBox.addChild(this.assets.youWonPaletteTimerIcon);

        this.assets.youWonPaletteTimerText = this.add.bitmapText(this.positions.youWonPaletteBoxsText.x, this.positions.youWonPaletteBoxsText.y, 'bahijFirasBold', '0', 22);
        this.assets.youWonPaletteTimerText.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteBlueDiamondsBox.addChild(this.assets.youWonPaletteTimerText);

        this.assets.youWonPaletteRedDiamondsBox = this.game.add.sprite(this.positions.youWonPaletteBoxs.rightX, this.positions.youWonPaletteBoxs.startY+this.positions.youWonPaletteBoxs.yInc, 'scorePalette');
        this.assets.youWonPaletteRedDiamondsBox.anchor.set(0.5, 0.5);
        this.assets.youWonPalette.addChild(this.assets.youWonPaletteRedDiamondsBox);

        this.assets.youWonPaletteCoinsIcon = this.game.add.sprite(this.positions.youWonPaletteBoxsIcon.x, this.positions.youWonPaletteBoxsIcon.y, 'levelIcons');
        this.assets.youWonPaletteCoinsIcon.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteCoinsIcon.frame = iconsFrames.redDiamond;
        this.assets.youWonPaletteRedDiamondsBox.addChild(this.assets.youWonPaletteCoinsIcon);

        this.assets.youWonPaletteCoinsText = this.add.bitmapText(this.positions.youWonPaletteBoxsText.x, this.positions.youWonPaletteBoxsText.y, 'bahijFirasBold', '0', 22);
        this.assets.youWonPaletteCoinsText.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteRedDiamondsBox.addChild(this.assets.youWonPaletteCoinsText);
        
        this.assets.youWonPaletteTotalPointsText = this.add.bitmapText(this.positions.youWonPaletteTotalPointsText.x, this.positions.youWonPaletteTotalPointsText.y, 'bahijFirasBold', '0', 22);
        this.assets.youWonPaletteTotalPointsText.anchor.set(0.5, 0.5);
        this.assets.youWonPalette.addChild(this.assets.youWonPaletteTotalPointsText);
         
        this.assets.youWonPaletteCloseBtn = this.add.button(this.positions.youWonPaletteCloseBtn.x, this.positions.youWonPaletteCloseBtn.y, 'palettesCloseBtn', this.youWonPaletteCloseClicked, this, 1, 0, 0, 0);
        this.assets.youWonPaletteCloseBtn.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteCloseBtn.inputEnabled = false;
        this.assets.youWonPalette.addChild(this.assets.youWonPaletteCloseBtn);
         
        this.assets.youWonPaletteNextBtn = this.add.button(this.positions.youWonPaletteNextBtn.x, this.positions.youWonPaletteNextBtn.y, 'palettesNextBtn', this.youWonPaletteNextClicked, this, 1, 0, 0, 0);
        this.assets.youWonPaletteNextBtn.anchor.set(0.5, 0.5);
        this.assets.youWonPaletteNextBtn.inputEnabled = false;
        this.assets.youWonPalette.addChild(this.assets.youWonPaletteNextBtn);
    },
    
    youWonPaletteCloseClicked: function(){
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
        globalVars.levels.level2.unlocked = true;
        storeGameData(n, globalVars);
        this.game.state.start('LevelsScene');
    },
    
    youWonPaletteNextClicked: function(){
//        console.log('youWonPaletteNextClicked');
        this.game.state.start('Level1Scene');
        this.game.state.states.StartScene.musicAssets.levelsClickEffect.play();
    },
    
    activateHero: function(){
        this.assets.keys = {};
        this.assets.keys.key_W = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.assets.keys.key_A = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.assets.keys.key_S = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.assets.keys.key_D = this.input.keyboard.addKey(Phaser.Keyboard.D);
        this.assets.keys.key_SPACEBAR = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    
    deactivateHero: function(){
//        console.log('deactivateHero');
        this.assets.keys = {
            key_W: {},
            key_A: {},
            key_S: {},
            key_D: {},
            key_SPACEBAR: {}
        };
    },
    
    createLevelTimer: function(){
        this.assets.timer = this.game.time.create(false);
        this.assets.timerCounter = 0;
        this.assets.timer.loop(1000, this.updateCounter, this);
        this.assets.timer.start();
    },
    
    updateCounter: function(){
        this.level1.requirements.timer.counted++;
        this.assets.stageTimerText.text = (this.level1.requirements.timer.totalDuration-this.level1.requirements.timer.counted)+' / '+this.level1.requirements.timer.totalDuration, 22;
//        console.log(this.assets.timerCounter);
        if(this.level1.requirements.timer.totalDuration == this.level1.requirements.timer.counted){
           this.assets.timer.destroy();
            console.log('End Level');
            this.openGameOverPalette();
        }
    },
    
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    updateMummiesVelocity: function(){
        this.assets.groups.mummies.forEach(function(mummy){
//            console.log(mummy.key);
            if(mummy.key == 'mummyWalkAnim'){
                mummy.body.velocity.x = 10 * mummy.scale.x;
            }else if(mummy.key == 'mummyJogAnim'){
                mummy.body.velocity.x = 30 * mummy.scale.x;
            }else if(mummy.key == 'mummyRunAnim'){
                mummy.body.velocity.x = 45 * mummy.scale.x;
            }
        }.bind(this));
    },
    
    
    updateMummiesDirection: function(){
        this.assets.groups.mummies.forEach(function(mummy){
//            console.log(mummy.body.blocked.left);
            if(mummy.body.blocked.left){
                mummy.currentDirection = this.level1.characterDirections.FORWARD;
                mummy.scale.x = 1;
            }else if(mummy.body.blocked.right){
                mummy.currentDirection = this.level1.characterDirections.BACKWARD;
                mummy.scale.x = -1;
            }
        }.bind(this));
    },
    
    
    emptySpritesToDestroy: function(){
//        console.log("emptySpritesToDestroy");
        
        
        this.assets.groups.spritesToDestroy.forEach(function(s){
//            console.log(s);
            switch(s.key){
                case('box'):
//                    console.log("box");
                    
                    this.createItemsfountain({contents: s.contents, startX: s.x, startY: s.y});
                    
                    var tempExplosion = this.createExplosion(s.x, s.y, this.assets.groups.explosions);
                    tempExplosion.onComplete.add(function(explosion){
                        this.assets.groups.explosions.remove(explosion);
                        this.assets.groups.spritesToDestroy.add(explosion);
//                        console.log(e);
                    }, this);
                    break;
                 case('tallVase'):
//                    console.log("tallVase");
                    
                    this.createItemsfountain({contents: s.contents, startX: s.x, startY: s.y});
                    
                    var tempExplosion = this.createExplosion(s.x, s.y, this.assets.groups.explosions);
                    tempExplosion.onComplete.add(function(explosion){
                        this.assets.groups.explosions.remove(explosion);
                        this.assets.groups.spritesToDestroy.add(explosion);
//                        console.log(e);
                    }, this);
                    break;
                case('circularVase'):
//                    console.log("circularVase");
                    
                    this.createItemsfountain({contents: s.contents, startX: s.x, startY: s.y});
                    
                    var tempExplosion = this.createExplosion(s.x, s.y, this.assets.groups.explosions);
                    tempExplosion.onComplete.add(function(explosion){
                        this.assets.groups.explosions.remove(explosion);
                        this.assets.groups.spritesToDestroy.add(explosion);
//                        console.log(e);
                    }, this);
                    break;
                case('barrel'):
//                    console.log("barrel");
                    this.createItemsfountain({contents: s.contents, startX: s.x, startY: s.y});
                    
                    var tempExplosion = this.createExplosion(s.x, s.y, this.assets.groups.explosions);
                    tempExplosion.onComplete.add(function(explosion){
                        this.assets.groups.explosions.remove(explosion);
                        this.assets.groups.spritesToDestroy.add(explosion);
//                        console.log(e);
                    }, this);
                    break;
            }
//            console.log(s.key);
            s.destroy();
        }.bind(this));
    },
    
    createItemsfountain: function(fountainData){
//        console.log("createItemsfountain");
//        console.log(fountainData);
        for(item in fountainData.contents){
            var itemName = item, totalItems = fountainData.contents[item];
//            console.log(item, totalItems);
            for(var itemCount = 0; itemCount<totalItems; itemCount++){
                if(itemName === 'coins'){
//                    console.log(1);
                    var tempItem = this.assets.groups.collectableItems.create(fountainData.startX, fountainData.startY, 'coinAnim');
                }else if(itemName === 'blueDiamonds'){
//                    console.log(2);
                    var tempItem = this.assets.groups.collectableItems.create(fountainData.startX, fountainData.startY, 'blueDiamondAnim');
                }else if(itemName === 'redDiamonds'){
//                    console.log(3);
                    var tempItem = this.assets.groups.collectableItems.create(fountainData.startX, fountainData.startY, 'redDiamondAnim');
                }
                var tempCount0 = Math.round(10 * Math.random()), tempCount1 = Math.round(10 * Math.random());
    //            console.log(tempCount);
                var tempArray0 = [], tempArray1 = [];
                for(var frameCount = 0; frameCount<tempCount0; frameCount++){
                    tempArray0.push(0);
                }
                for(var frameCount = 0; frameCount<tempCount1; frameCount++){
                    tempArray1.push(0);
                }
                tempItem.animations.add('spin', tempArray0.concat([0, 1, 2, 3, 4, 0, 0, 0, 0, 0]).concat(tempArray1), 10, true);
                this.game.physics.arcade.enable(tempItem);
                this.game.slopes.enable(tempItem);
                tempItem.body.collideWorldBounds = true;
                tempItem.body.gravity.y = this.level1.gravity.y;
                tempItem.body.velocity.x = this.level1.items.velocity.x + (this.level1.items.velocity.randomX * Math.random());
                tempItem.body.velocity.y = this.level1.items.velocity.y + (this.level1.items.velocity.randomY * Math.random());
                tempItem.body.bounce.set(0.2);
                tempItem.animations.play("spin");
            }
        }

    },
    
    createExplosion: function(x, y, group){
        var tempExplosion = group.create(x, y, 'explosionAnim');
        tempExplosion.checkWorldBounds = true;
        tempExplosion.anchor.set(0.2, 0.2);
        var tempAnim = tempExplosion.animations.add('anim', [0, 1, 2, 3], 10, false);
        tempExplosion.animations.play("anim");
        this.game.state.states.StartScene.musicAssets.levelsExplosionEffect.play();
        return tempAnim;
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
//                    console.log(this.assets.hero.body.onFloor(),  this.assets.hero.body.touching.down)
                    if(this.assets.hero.body.onFloor() || this.assets.hero.body.touching.down){
                        if(this.level1.hero.currentState !== this.level1.heroStates.WALKING || this.level1.hero.currentDirection !== this.level1.characterDirections.BACKWARD){
                            this.level1.hero.currentDirection = this.level1.characterDirections.BACKWARD;
                            this.changeHeroState(this.level1.heroStates.WALKING);
                        }else{
                            this.assets.hero.body.x -= this.level1.heroSpeed.x;
                            if(!this.assets.hero.body.onFloor() && this.assets.hero.body.slopes.tile.index == 95){
//                                console.log(this.assets.hero.body.slopes.tile.index);
                                this.assets.hero.body.y += this.level1.heroSpeed.y;
                            }
                        }
                    }else{
                        if(this.level1.hero.currentState !== this.level1.heroStates.STANDING){
                            this.changeHeroState(this.level1.heroStates.STANDING);
                        }
                    }
                }
                if(tempKeysDown[index] == "d"){
                    if(this.assets.hero.body.onFloor() || this.assets.hero.body.touching.down){
                        if(this.level1.hero.currentState !== this.level1.heroStates.WALKING || this.level1.hero.currentDirection !== this.level1.characterDirections.FORWARD){
                            this.level1.hero.currentDirection = this.level1.characterDirections.FORWARD;
                            this.changeHeroState(this.level1.heroStates.WALKING);                         
                        }else{
//                            console.log(this.assets.level1.heroSpeed.x);
                            this.assets.hero.body.x += this.level1.heroSpeed.x;
                            if(!this.assets.hero.body.onFloor() && this.assets.hero.body.slopes.tile.index == 94){
//                                console.log(this.assets.hero.body.slopes.tile.index);
                                this.assets.hero.body.y += this.level1.heroSpeed.y;
                            }
                        }
                    }else{
                        if(this.level1.hero.currentState !== this.level1.heroStates.STANDING){
                            this.changeHeroState(this.level1.heroStates.STANDING);
                        }
                    }   
                }
                if(tempKeysDown[index] == "w"){
                    var tile = checkCollisionBetween(this.assets.hero, this.assets.layers.ladders, addOneToArray(this.level1.map.stairsTilesUp));
                    if(tile){
                        if(this.level1.hero.currentState !== this.level1.heroStates.CLIMBING){
                            this.changeHeroState(this.level1.heroStates.CLIMBING);
                        }else{
                            this.assets.hero.x = tile.worldX+40;
                            this.assets.hero.y -= this.level1.heroSpeed.y;
                        }
                    }
                }
                if(tempKeysDown[index] == "s"){
                    var tile = checkCollisionBetween(this.assets.hero, this.assets.layers.ladders, addOneToArray(this.level1.map.stairsTilesDown));
                    if(tile){
                        if(this.level1.hero.currentState !== this.level1.heroStates.CLIMBING){
                            this.changeHeroState(this.level1.heroStates.CLIMBING);
                        }else{
                            this.assets.hero.x = tile.worldX+40;
                            this.assets.hero.y += this.level1.heroSpeed.y;
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
    
    changeHeroState(newState){
        
        var tempPosition = {x:this.assets.hero.x, y:this.assets.hero.y, scaleX: this.assets.hero.scale.x};
        
        if(this.level1.hero.currentState == this.level1.heroStates.STANDING || this.level1.hero.currentState == this.level1.heroStates.WALKING){
            switch(newState){
                    case(this.level1.heroStates.STANDING):
                        this.assets.hero.animations.play('stand');
                        this.level1.hero.currentState = this.level1.heroStates.STANDING;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
                    case(this.level1.heroStates.WALKING):
                        this.assets.hero.animations.play('walk');
                        this.level1.hero.currentState = this.level1.heroStates.WALKING;
                        if(!this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.play();
                        }   
                        break;
                    case(this.level1.heroStates.CLIMBING):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        this.createClimbingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('climbing');
                        this.level1.hero.currentState = this.level1.heroStates.CLIMBING;
                        if(!this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.play();
                        }
                        break;
                    case(this.level1.heroStates.SHOOTING):
//                        this.assets.hero.body = null;
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        var shooting = this.createShootingHero(tempPosition.x, tempPosition.y);
                        shooting.onComplete.add(function(){
                            this.changeHeroState(this.level1.heroStates.STANDING);
                            this.createNewArrow();
                        }, this);
                        this.assets.hero.scale.x = tempPosition.scaleX;
                        this.assets.hero.animations.play('shooting');
                        this.level1.hero.currentState = this.level1.heroStates.SHOOTING;
                        break;
                    case(this.level1.heroStates.DYING_TO_BE_MUMMY):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        var dying = this.createDyingHero(tempPosition.x, tempPosition.y);
                        dying.onComplete.add(function(){
                            this.changeHeroState(this.level1.heroStates.RISING_AS_MUMMY);
                        }, this);
                        this.assets.hero.scale.x = tempPosition.scaleX;
                        this.assets.hero.animations.play('dying');
                        this.level1.hero.currentState = this.level1.heroStates.DYING_TO_BE_MUMMY;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
                    case(this.level1.heroStates.DYING_BY_SPIKES):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        var dying = this.createDyingHero(tempPosition.x, tempPosition.y);
                        dying.onComplete.add(function(){
                            this.game.time.events.add(Phaser.Timer.QUARTER, function (){
                                this.openGameOverPalette();
                            }.bind(this));
                        }, this);
                        this.assets.hero.scale.x = tempPosition.scaleX;
                        this.assets.hero.animations.play('dying');
                        this.level1.hero.currentState = this.level1.heroStates.DYING_BY_SPIKES;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
            }
        }else if(this.level1.hero.currentState == this.level1.heroStates.CLIMBING){
            switch(newState){
                    case(this.level1.heroStates.STANDING):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        this.createWalkingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('stand');
                        this.level1.hero.currentState = this.level1.heroStates.STANDING;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
                    case(this.level1.heroStates.WALKING):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        this.createWalkingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('walk');
                        this.level1.hero.currentState = this.level1.heroStates.WALKING;
                        if(!this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.play();
                        }
                        break;
                    case(this.level1.heroStates.SHOOTING):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        this.createShootingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('shooting');
                        this.level1.hero.currentState = this.level1.heroStates.SHOOTING;
                        this.game.time.events.add(Phaser.Timer.QUARTER, function (){
                            this.changeHeroState(this.level1.heroStates.STANDING);
                        }.bind(this));
                        break;
                    case(this.level1.heroStates.DYING_TO_BE_MUMMY):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        var dying = this.createDyingHero(tempPosition.x, tempPosition.y);
                        dying.onComplete.add(function(){
                            this.changeHeroState(this.level1.heroStates.RISING_AS_MUMMY);
                        }, this);
                        this.assets.hero.scale.x = tempPosition.scaleX;
                        this.assets.hero.animations.play('dying');
                        this.level1.hero.currentState = this.level1.heroStates.DYING_TO_BE_MUMMY;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
                    case(this.level1.heroStates.DYING_BY_SPIKES):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        var dying = this.createDyingHero(tempPosition.x, tempPosition.y);
                        dying.onComplete.add(function(){
                            this.game.time.events.add(Phaser.Timer.QUARTER, function (){
                                this.openGameOverPalette();
                            }.bind(this));
                        }, this);
                        this.assets.hero.scale.x = tempPosition.scaleX;
                        this.assets.hero.animations.play('dying');
                        this.level1.hero.currentState = this.level1.heroStates.DYING_BY_SPIKES;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
            }
        }else if(this.level1.hero.currentState == this.level1.heroStates.SHOOTING){
             switch(newState){
                    case(this.level1.heroStates.STANDING):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        this.createWalkingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('stand');
                        this.level1.hero.currentState = this.level1.heroStates.STANDING;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
                     case(this.level1.heroStates.WALKING):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        this.createWalkingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('walk');
                        this.level1.hero.currentState = this.level1.heroStates.WALKING;
                        if(!this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.play();
                        }
                        break;
                     case(this.level1.heroStates.CLIMBING):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        this.createClimbingHero(tempPosition.x, tempPosition.y);
                        this.assets.hero.animations.play('climbing');
                        this.level1.hero.currentState = this.level1.heroStates.CLIMBING;
                        if(!this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.play();
                        }
                        break;
                     case(this.level1.heroStates.DYING_TO_BE_MUMMY):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        var dying = this.createDyingHero(tempPosition.x, tempPosition.y);
                        dying.onComplete.add(function(){
                            this.changeHeroState(this.level1.heroStates.RISING_AS_MUMMY);
                        }, this);
                        this.assets.hero.scale.x = tempPosition.scaleX;
                        this.assets.hero.animations.play('dying');
                        this.level1.hero.currentState = this.level1.heroStates.DYING_TO_BE_MUMMY;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
                     case(this.level1.heroStates.DYING_BY_SPIKES):
                        this.assets.groups.spritesToDestroy.add(this.assets.hero);
                        var dying = this.createDyingHero(tempPosition.x, tempPosition.y);
                        dying.onComplete.add(function(){
                            this.game.time.events.add(Phaser.Timer.QUARTER, function (){
                                this.openGameOverPalette();
                            }.bind(this));
                        }, this);
                        this.assets.hero.scale.x = tempPosition.scaleX;
                        this.assets.hero.animations.play('dying');
                        this.level1.hero.currentState = this.level1.heroStates.DYING_BY_SPIKES;
                        if(this.game.state.states.StartScene.musicAssets.levelsWalkEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsWalkEffect.stop();
                        }
                        if(this.game.state.states.StartScene.musicAssets.levelsClimbEffect.isPlaying){
                            this.game.state.states.StartScene.musicAssets.levelsClimbEffect.stop();
                        }
                        break;
             }
        }else if(this.level1.hero.currentState == this.level1.heroStates.DYING_TO_BE_MUMMY){
            if(newState === this.level1.heroStates.RISING_AS_MUMMY){
                this.assets.groups.spritesToDestroy.add(this.assets.hero);
                var rising = this.createRisingMummyHero(tempPosition.x, tempPosition.y);
                rising.onComplete.add(function(){
                    this.changeHeroState(this.level1.heroStates.MUMMY_STANDING);
                }, this);
                this.assets.hero.scale.x = tempPosition.scaleX;
                this.assets.hero.animations.play('rising');
                this.level1.hero.currentState = this.level1.heroStates.RISING_AS_MUMMY;
            }
        }else if(this.level1.hero.currentState == this.level1.heroStates.RISING_AS_MUMMY){
            if(newState === this.level1.heroStates.MUMMY_STANDING){
                this.assets.groups.spritesToDestroy.add(this.assets.hero);
                var standing = this.createStadingMummyHero(tempPosition.x, tempPosition.y);
                this.assets.hero.scale.x = tempPosition.scaleX;
                this.assets.hero.animations.play('standing');
                this.level1.hero.currentState = this.level1.heroStates.MUMMY_STANDING;
                this.game.time.events.add(Phaser.Timer.QUARTER, function (){
                    this.openGameOverPalette();
                }.bind(this));
            }
        }
        
        if(this.level1.hero.currentDirection == this.level1.characterDirections.FORWARD){
            this.assets.hero.scale.x = 1;
        }else if(this.level1.hero.currentDirection == this.level1.characterDirections.BACKWARD){
            this.assets.hero.scale.x = -1;
        }
    },
    
    createNewArrow: function(){
        var tempArrow = this.assets.groups.arrows.create(this.assets.hero.x, this.assets.hero.y-30, 'arrow');
        tempArrow.checkWorldBounds = true;
        tempArrow.events.onOutOfBounds.add(function(arrow){
//            console.log("out");
            this.assets.groups.arrows.remove(arrow);
            this.assets.groups.spritesToDestroy.add(arrow);
        }.bind(this), this);
        if(this.level1.hero.currentDirection == this.level1.characterDirections.BACKWARD){
            tempArrow.body.velocity.x = -320;
        }else{
            tempArrow.body.velocity.x = 320;
        }
        tempArrow.scale.x = this.assets.hero.scale.x;
        this.game.state.states.StartScene.musicAssets.levelsThrowEffect.play();
    },
    
    arrowHitObject: function(arrow, item){
//        console.log("arrowHitObject");
//        console.log(item.key);
        var groupName = item.key;
        if(item.key == "box"){
            var groupName = "boxes";
        }else if(item.key == "mummyRiseAnim" || item.key == "mummyWalkAnim" || item.key == "mummyJogAnim" || item.key == "mummyRunAnim"){
            var groupName = "mummies";  
        }else{
            var groupName = item.key+ "s";
        }
//        console.log(item.key);
        this.assets.groups[groupName].remove(item);
        this.assets.groups.spritesToDestroy.add(item);
        this.assets.groups.arrows.remove(arrow);
        this.assets.groups.spritesToDestroy.add(arrow);
    },
    
    arrowHitMummy: function(arrow, mummy){
//        console.log("arrowHitMummy");
        this.assets.groups.mummies.remove(mummy);
        this.assets.groups.spritesToDestroy.add(mummy);
        this.createDyingMummy(mummy.x, mummy.y, mummy.generatorID, mummy.currentDirection);
        this.assets.groups.arrows.remove(arrow);
        this.assets.groups.spritesToDestroy.add(arrow);
        this.game.state.states.StartScene.musicAssets.levelsHitEffect.play();
        this.game.state.states.StartScene.musicAssets.levelsKilledEffect.play();
    },
    
    heroCollect: function(hero, item){
//        console.log("heroCollect");
        if(item.key == "coinAnim" || item.key == "blueDiamondAnim" || item.key == "redDiamondAnim"){
            item.body.gravity.y = 0;
            item.body.gravity.y = 0;
            this.game.state.states.StartScene.musicAssets.levelsCollectEffect.play();
            var tween = this.game.add.tween(item).to( { x:0, y:0 }, 500, "Linear", true);
            tween.onComplete.add(function(e){
//                console.log('onComplete');
//                console.log(this);
                if(item.body !== null){
                    switch(item.key){
                        case('coinAnim'):
                            this.level1.requirements.coins.collected++;
                            this.updateCoinsCount();
                            break;
                        case('blueDiamondAnim'):
                            this.level1.requirements.blueDiamonds.collected++;
                            this.updateBlueDiamondsCount();
                            break;
                        case('redDiamondAnim'):
                            this.level1.requirements.redDiamonds.collected++;
                            this.updateRedDiamondsCount();
                            break;
                    }
                    item.body = null;
                    this.assets.groups.collectableItems.remove(item);
                    this.assets.groups.spritesToDestroy.add(item);
                }

            }.bind(this), this)
        }
    },
    
    mummyHitHeroCheck: function(hero, mummy){
        var horCheck = false;
        var verCheck = false;
//        console.log(Math.abs(hero.x-mummy.x), hero.width)
        if(Math.abs(hero.x-mummy.x) <= Math.abs(hero.width)){
            var horCheck = true;
        }
        if(Math.abs(hero.y-mummy.y) <= hero.height){
            var verCheck = true;
        }
//        console.log(horCheck, verCheck);
        return horCheck && verCheck;
    },
    
    mummyHitHero: function(hero, mummy){
        if(!hero.isMummy){
//            console.log("mummyHitHero");
            this.game.state.states.StartScene.musicAssets.levelsEatingEffect.play();
            this.deactivateHero();
            hero.isMummy = true;
            this.assets.groups.mummies.remove(mummy);
            this.assets.groups.spritesToDestroy.add(mummy);
            this.createStandingMummy(mummy.x, mummy.y, mummy.generatorID, mummy.currentDirection);
            this.changeHeroState(this.level1.heroStates.DYING_TO_BE_MUMMY);
            hero.isMummy = true;
        }
    },
    
    heroIsOnTheDoor: function(hero, door){
//        console.log("heroIsOnTheDoor");
//        console.log(hero, door);
        this.deactivateHero();
        this.level1.heroIsOnTheDoor = true;
        this.tween = this.add.tween(this.assets.hero).to({x: this.assets.door.x}, 1500, Phaser.Easing.Cubic.Out, true);
        this.tween.onComplete.add(function(hero){
            this.tween = this.add.tween(this.assets.hero.scale).to({x: 0.1, y: 0.1}, 1500, Phaser.Easing.Cubic.Out, true);
            this.tween = this.add.tween(this.assets.hero).to({alpha: 0}, 500, Phaser.Easing.Cubic.Out, true);
            this.tween.onComplete.add(function(hero){
                console.log('done');
                console.log('you win');
                this.game.state.states.StartScene.musicAssets.levelsCheeringEffect.play();
                this.openYouWonPalette();
            }.bind(this), this);
        }.bind(this), this);
    },
    
    updateCoinsCount: function(){
//        console.log('updateCoinsCount');
         this.assets.stageCoinsText.text = this.level1.requirements.coins.collected+' / '+this.level1.requirements.coins.required, 22;
    },
    
    updateBlueDiamondsCount: function(){
//        console.log('updateBlueDiamondsCount');
         this.assets.stageBlueDiamondsText.text = this.level1.requirements.blueDiamonds.collected+' / '+this.level1.requirements.blueDiamonds.required, 22;
    },
    
    updateRedDiamondsCount: function(){
//        console.log('updateRedDiamondsCount');
         this.assets.stageRedDiamondsText.text = this.level1.requirements.redDiamonds.collected+' / '+this.level1.requirements.redDiamonds.required, 22;
    },
    checkSpikesCollidHero: function(){
//        console.log("checkSpikesCollidHero");
        var tile = this.assets.level1Map.getTileWorldXY(this.assets.hero.x, this.assets.hero.y-40, this.assets.level1Map.tileWidth, this.assets.level1Map.tileHeight, this.assets.layers.background);
        if(tile !== null){
            var inArray = false;
            var spikesTiles = addOneToArray(this.level1.map.spikesTiles);
            for(var tileCount=0; tileCount<spikesTiles.length; tileCount++){
                if(tile.index == spikesTiles[tileCount]){
                    inArray = true;
                    break;
                }
            }
            if(inArray){
                if(this.level1.hero.currentState!==this.level1.heroStates.DYING_BY_SPIKES && this.level1.hero.currentState!==this.level1.heroStates.DYING_TO_BE_MUMMY && this.level1.hero.currentState!==this.level1.heroStates.RISING_AS_MUMMY && this.level1.hero.currentState!==this.level1.heroStates.MUMMY_STANDING){
                    this.game.state.states.StartScene.musicAssets.levelsCryEffect.play();
                    this.deactivateHero();
                    this.changeHeroState(this.level1.heroStates.DYING_BY_SPIKES);
                    this.assets.hero.isMummy = true;
                }
            }
        }
    },
    updateCollectableItems: function(){
//        console.log("updateCollectableItems");
//        console.log(this.assets.groups.collectableItems.length);
//        this.assets.groups.collectableItems.callAll('animations.play', 'animations', 'spin');
        this.assets.groups.collectableItems.forEach(function(item) {
            if(item.body.onFloor()){
                item.body.velocity.x = 0;
            }
        });
    },
    
    updateOverscreenShadows: function(checkAllCollected){
//        console.log("updateOverscreenShadows");
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
        if(checkAllCollected){
            if(this.level1.fireStatus == 'OFF'){
                this.level1.fireStatus = 'ON';
                this.assets.groups.fires = this.add.group();
                this.assets.groups.fires.enableBody = true;
                this.assets.level1Map.createFromObjects('level1Fires', getFrameOf('fire'), 'fireAnim', 0, true, false, this.assets.groups.fires);
                this.assets.groups.fires.callAll('animations.add', 'animations', 'spin', [0,1,2,3], 10, true);
                this.assets.groups.fires.callAll('animations.play', 'animations', 'spin');
                this.game.state.states.StartScene.musicAssets.levelsFireOnEffect.play();
            }
            for(var fireCount = 0; fireCount<this.assets.groups.fires.children.length; fireCount++){
                var fireObj = {
                    x0: this.assets.groups.fires.children[fireCount].x+40 - this.game.camera.x,
                    y0: this.assets.groups.fires.children[fireCount].y+40 - this.game.camera.y,
                    radius0: (200 + this.game.rnd.integerInRange(1,10)) * 0.2,
                    x1: this.assets.groups.fires.children[fireCount].x+40 - this.game.camera.x,
                    y1: this.assets.groups.fires.children[fireCount].y+40 - this.game.camera.y,
                    radius1: 200 + this.game.rnd.integerInRange(1,10),
                };
                this.updateLightFor(fireObj);
            }
        }
    },
    
    checkAllCollected: function(){
//        console.log(this.level1.requirements.coins.required <= this.level1.requirements.coins.collected && this.level1.requirements.redDiamonds.required <= this.level1.requirements.redDiamonds.collected && this.level1.requirements.blueDiamonds.required <= this.level1.requirements.blueDiamonds.collected);
        if(this.level1.requirements.coins.required <= this.level1.requirements.coins.collected && this.level1.requirements.redDiamonds.required <= this.level1.requirements.redDiamonds.collected && this.level1.requirements.blueDiamonds.required <= this.level1.requirements.blueDiamonds.collected){
            return true;
        }
        return false;
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
    
    
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    activateEnemiesGenerators: function(){
//        console.log('activateEnemiesGenerators');
//        mummiesGenerators
        for(var generatorsCount = 0; generatorsCount<this.level1.mummiesGenerators.length; generatorsCount++){
            this.game.time.events.loop(this.level1.mummiesGenerators[generatorsCount].delay, this.generateMummy, this, generatorsCount);
        }
//        this.game.time.events.loop(5000, this.generateMummy, this, 0);
    },
    
    generateMummy: function(id){
        if(this.level1.mummiesGenerators[id].enabeled){
            var mummyTypes = ['mummyRunAnim', 'mummyRunAnim', 'mummyRunAnim'];
            var mummyType = Math.floor(Math.random() * 3);
//            console.log(mummyTypes[mummyType]);
            this.createRisingMummy(this.assets.layers.enemiesGenerators[id].x+40, this.assets.layers.enemiesGenerators[id].y, mummyTypes[mummyType], id);
            this.level1.mummiesGenerators[id].enabeled = false;
        }
    },
    
    createRisingMummy: function(x, y, transformTo, generatorID){
//        console.log('createRisingMummy');
        var tempMummy = this.assets.groups.mummies.create(x, y, 'mummyRiseAnim');
        tempMummy.generatorID = generatorID;
        tempMummy.transformTo = transformTo;
        tempMummy.anchor.set(0.5, 1);
        var mummyDitrection = Math.round(Math.random());
        tempMummy.anchor.set(0.5, 1);
        if(mummyDitrection == 1){
            tempMummy.currentDirection = this.level1.characterDirections.BACKWARD;
            tempMummy.scale.x = -1;
        }else{
            tempMummy.currentDirection = this.level1.characterDirections.FORWARD;
        }
        var tempRise = tempMummy.animations.add('rise', [0, 1, 2, 3, 4, 5, 6, 7], 5, false);
        tempRise.onComplete.add(function(mummy){
            this.assets.groups.mummies.remove(mummy);
            this.assets.groups.spritesToDestroy.add(mummy);
            if(mummy.transformTo == 'mummyWalkAnim'){
                this.createWalkingMummy(mummy.x, mummy.y, mummy.generatorID, mummy.currentDirection);
            }else if(mummy.transformTo == 'mummyJogAnim'){
                this.createJoggingMummy(mummy.x, mummy.y, mummy.generatorID, mummy.currentDirection);
            }else if(mummy.transformTo == 'mummyRunAnim'){
                this.createRunningMummy(mummy.x, mummy.y, mummy.generatorID, mummy.currentDirection);
            }
        }, this);
        tempMummy.animations.play('rise');
        this.game.state.states.StartScene.musicAssets.levelsRisingEffect.play();
        this.game.physics.arcade.enable(tempMummy);
        this.game.slopes.enable(tempMummy);
        tempMummy.body.collideWorldBounds = true;
        tempMummy.body.gravity.y = this.level1.gravity.y;
    },
    
    createWalkingMummy: function(x, y, generatorID, direction){
//        console.log("createWalkingMummy");
        var tempMummy = this.assets.groups.mummies.create(x, y, 'mummyWalkAnim');
        tempMummy.generatorID = generatorID;
        tempMummy.anchor.set(0.5, 1);
        tempMummy.currentDirection = direction;
        tempMummy.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
        tempMummy.animations.play('walk');
        this.game.physics.arcade.enable(tempMummy);
        this.game.slopes.enable(tempMummy);
        tempMummy.body.collideWorldBounds = true;
        tempMummy.body.gravity.y = this.level1.gravity.y;
        if(tempMummy.currentDirection == this.level1.characterDirections.BACKWARD){
            tempMummy.scale.x = -1;
            tempMummy.body.velocity.x = -10;
        }else{
            tempMummy.scale.x = 1;
            tempMummy.body.velocity.x = 10;
        }
        
    },
    
    createJoggingMummy: function(x, y, generatorID, direction){
//        console.log("createJoggingMummy");
        var tempMummy = this.assets.groups.mummies.create(x, y, 'mummyJogAnim');
        tempMummy.generatorID = generatorID;
        tempMummy.anchor.set(0.5, 1);
        tempMummy.currentDirection = direction;
        tempMummy.animations.add('jog', [0, 1, 2, 3, 4, 5, 6], 5, true);
        tempMummy.animations.play('jog');
        this.game.physics.arcade.enable(tempMummy);
        this.game.slopes.enable(tempMummy);
        tempMummy.body.collideWorldBounds = true;
        tempMummy.body.gravity.y = this.level1.gravity.y;
        if(tempMummy.currentDirection == this.level1.characterDirections.BACKWARD){
            tempMummy.scale.x = -1;
            tempMummy.body.velocity.x = -30;
        }else{
            tempMummy.scale.x = 1;
            tempMummy.body.velocity.x = 30;
        }
    },
    
    createRunningMummy: function(x, y, generatorID, direction){
//        console.log("createRunningMummy");
        var tempMummy = this.assets.groups.mummies.create(x, y, 'mummyRunAnim');
        tempMummy.generatorID = generatorID;
        tempMummy.anchor.set(0.5, 1);
        tempMummy.currentDirection = direction;
        tempMummy.animations.add('run', [0, 1, 2, 3, 4, 5], 5, true);
        tempMummy.animations.play('run');
        this.game.physics.arcade.enable(tempMummy);
        this.game.slopes.enable(tempMummy);
        tempMummy.body.collideWorldBounds = true;
        tempMummy.body.gravity.y = this.level1.gravity.y;
        if(tempMummy.currentDirection == this.level1.characterDirections.BACKWARD){
            tempMummy.scale.x = -1;
            tempMummy.body.velocity.x = -45;
        }else{
            tempMummy.scale.x = 1;
            tempMummy.body.velocity.x = 45;
        }
    },
    
    createStandingMummy: function(x, y, generatorID, direction){
//        console.log("createStandingMummy");
        var tempMummy = this.assets.groups.mummies.create(x, y, 'mummyStandAnim');
        tempMummy.generatorID = generatorID;
        tempMummy.anchor.set(0.5, 1);
        tempMummy.currentDirection = direction;
        tempMummy.animations.add('run', [0, 1, 2, 3, 4, 5], 5, true);
        tempMummy.animations.play('run');
        this.game.physics.arcade.enable(tempMummy);
        this.game.slopes.enable(tempMummy);
        tempMummy.body.collideWorldBounds = true;
        tempMummy.body.gravity.y = this.level1.gravity.y;
        if(tempMummy.currentDirection == this.level1.characterDirections.BACKWARD){
            tempMummy.scale.x = -1;
        }else{
            tempMummy.scale.x = 1;
        }
    },
    
    createDyingMummy: function(x, y, generatorID, direction){
//        console.log("createDyingMummy");
        var tempMummy = this.assets.groups.dyingMummies.create(x, y, 'mummyDieAnim');
        tempMummy.generatorID = generatorID;
        tempMummy.anchor.set(0, 1);
        tempMummy.currentDirection = direction;
        var tempDie = tempMummy.animations.add('die', [0, 1, 2, 3, 4, 5], 5, false);
        tempDie.onComplete.add(function(mummy){
            this.tween = this.add.tween(mummy).to({alpha: 0}, 500, Phaser.Easing.Cubic.Out, true);
            this.tween.onComplete.add(function(mummy){
//                console.log('onComplete');
//                console.log(mummy);
                this.assets.groups.dyingMummies.remove(mummy);
                this.assets.groups.spritesToDestroy.add(mummy);
                this.level1.mummiesGenerators[mummy.generatorID].enabeled = true;
            }.bind(this), this);
        }, this);
        tempMummy.animations.play('die');
        this.game.physics.arcade.enable(tempMummy);
        this.game.slopes.enable(tempMummy);
        tempMummy.body.collideWorldBounds = true;
        tempMummy.body.gravity.y = this.level1.gravity.y;
        if(tempMummy.currentDirection == this.level1.characterDirections.BACKWARD){
            tempMummy.scale.x = -1;
        }else{
            tempMummy.scale.x = 1;
        }
    },
    
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    openTheDoor: function(){
        console.log('openTheDoor');
        this.assets.door.animations.play('opening');
        this.assets.doorSwitch.animations.play('opening');
        this.game.physics.arcade.enable(this.assets.door);
        this.game.state.states.StartScene.musicAssets.levelsDoorOpenEffect.play();
    },
}

