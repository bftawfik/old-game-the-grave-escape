var config = {
    type: Phaser.AUTO,
    width: 720,
    height: 1280,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 200}
        }
    },
    scene: [scene1, scene2, scene3]
    
};

var game = new Phaser.Game(config);