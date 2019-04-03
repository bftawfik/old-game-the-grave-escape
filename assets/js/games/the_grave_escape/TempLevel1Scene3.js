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
                x: 700,
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
        
        //*************************************************************************************************************
        this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);
        
        this.assets.level1Map = this.add.tilemap('level1Map');
        this.assets.level1Map.addTilesetImage('levelsSlopes', 'arcade-slopes-80');
        this.assets.level1Map.setCollisionBetween(89, 127);
//
//        
        ground = this.assets.level1Map.createLayer('level1LayerSlops');
        ground.x = -300;
        ground.resizeWorld();
        ground.debug = true;
//
//        
        this.game.slopes.convertTilemapLayer(ground, 'arcadeslopes', 89);
        
        player = this.game.add.sprite(400, 50, 'heroWalkAnim');
        
        
        this.game.physics.arcade.enable(player);
        this.game.slopes.enable(player);
        
        player.body.collideWorldBounds = true;
        this.game.camera.follow(player);
        
        player.body.gravity.y = 200;
        cursors = game.input.keyboard.createCursorKeys();
        
        
        
    },
    

    update: function(){
//        console.log("update");
        player.body.velocity.x = 0; 
        this.game.physics.arcade.collide(player, ground);

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -60; 
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 60; 
        }
//        console.log(player.x)

    },
    
}

