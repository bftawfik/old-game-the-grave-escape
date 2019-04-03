var n = 'BFTawfikGraveEscape V 0.9.0';

var globalVars = {};

const iconsFrames = {
    timer: 0,
    coins: 1,
    redDiamond: 2,
    blueDiamond: 3,
}

var config = {
    width: 1280,
    height: 720,
    tileWidth: 80,
    tileHeight: 80,
    renderer: Phaser.AUTO,
    antialias: true,
    multiTexture: true
}

var game = new Phaser.Game(config);

//----------------------------------------------------------------------------------------------

function setDefaultGlobalValues(){
    return {
        bgMusic: true,
        soundEffects: true,
        bestScore: 0,
        levels: {
            count: 5,
            level1: {
                unlocked: true,
                stars: 0,
                bestScore: 0
            },
            level2: {
                unlocked: false,
                stars: 0,
                bestScore: 0
            },
            level3: {
                unlocked: false,
                stars: 0,
                bestScore: 0
            },
            level4: {
                unlocked: false,
                stars: 0,
                bestScore: 0
            },
            level5: {
                unlocked: false,
                stars: 0,
                bestScore: 0
            }
        }
    };
}

function retrieveGameData(gameName){
    if (typeof(Storage) !== "undefined") {
        var oldGameData = JSON.parse(localStorage.getItem(gameName));
        if(oldGameData){
            delete oldGameData.date;
            return oldGameData;
        }
        return null;
    }
    return null;
}

function storeGameData(gameName, gameData){
    var tempGameData  = Object.assign(gameData);
    if(!tempGameData.date){
        tempGameData.date = +new Date();
    }
    if (typeof(Storage) !== "undefined") {
        var newGameData = retrieveGameData(n)? retrieveGameData(n) : Object.assign(gameData);
        if(newGameData.date < tempGameData.date && newGameData.bestScore < tempGameData.bestScore){
            newGameData.date = tempGameData.date;
            newGameData.bestScore = tempGameData.bestScore;
            newGameData.levels = Object.assign(tempGameData.levels);
        }
        if(newGameData.bgMusic != tempGameData.bgMusic){
            newGameData.date = tempGameData.date;
            newGameData.bgMusic = tempGameData.bgMusic;
        }
        if(newGameData.soundEffects != tempGameData.soundEffects){
            newGameData.date = tempGameData.date;
            newGameData.soundEffects = tempGameData.soundEffects;
        }
        for(var levelsCount=1; levelsCount<=newGameData.levels.count; levelsCount++){
            if(newGameData.levels["level"+levelsCount].unlocked != tempGameData.levels["level"+levelsCount].unlocked || newGameData.levels["level"+levelsCount].bestScore < tempGameData.levels["level"+levelsCount].bestScore){
                newGameData.levels["level"+levelsCount] = Object.assign(tempGameData.levels["level"+levelsCount]);
            }
        }
        try{
            localStorage.setItem( gameName, JSON.stringify(newGameData));
            return true;
        }catch(error){
            return false;
        }
        return false;
    }
    return false;
}

function addGameStates(){
    game.state.add('Boot', Boot);
    game.state.add('MainPreloader', MainPreloader);
    game.state.add('StartScene', StartScene);
    game.state.add('LevelsScene', LevelsScene);
    game.state.add('Level1Preloader', Level1Preloader);
    game.state.add('Level2Preloader', Level2Preloader);
    game.state.add('Level1Scene', Level1Scene);
    game.state.add('Level2Scene', Level2Scene);

}

function getFrameOf(obj){
    var objectsFrames = {
        circularSaw: 68,
        lifter: 53,

        flatDoor: 69,
        roundDoor: 70,
        doorSwitch: 78,

        circularVase: 76,
        tallVase: 84,

        ladderTop: 66,
        ladderMiddle: 74,
        ladderBottom: 82,

        coffin: 71,
        box: 77,
        barrel: 85,
        chest: 86,

        key: 79,

        fire: 87,
        
        enemiesGenerator: 75

    };
    return addOne(objectsFrames[obj]);
}

function addOne(no){
    return ++no;
};

function addOneToArray(arr){
    var newArr = [];
     for(var arrCount = 0; arrCount<arr.length ;arrCount++){
         newArr.push(addOne(arr[arrCount]));
    }
    return newArr;
};

function findInArray(arr, gridId){
//    console.log(arr, gridId);
    for(var arrCount = 0; arrCount<arr.length ;arrCount++){
//        console.log(arr[arrCount].gid, gridId, arr[arrCount].gid == gridId);
        if(arr[arrCount].gid == gridId){
            return arr[arrCount];
        }
    }
    return null;
}

//----------------------------------------------------------------------------------------------

globalVars = setDefaultGlobalValues();

globalVars = retrieveGameData(n)? retrieveGameData(n) : globalVars;

storeGameData(n, globalVars);

addGameStates();

game.state.start('Boot');