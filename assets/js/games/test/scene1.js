class scene1 extends Phaser.Scene{
    constructor(){
        super({key: 'scene1'});
    }
    
    preload(){
        this.load.image('GFS', 'assets/img/graveEscapeTiles.png');
    }
    
    create(){
        this.image = this.add.image(400, 300, 'GFS');
        
        
//        this.input.keyboard.on('keyup_D', function(event){ 
//            this.image.x += 10;
//        }, this);
        
        
        this.keys = {};
        this.keys.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        
        this.input.on('pointerdown', function(event){
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);
        
        
        this.input.keyboard.on('keyup_P', function(event){ 
            var physicsImage = this.physics.add.image(this.image.x, this.image.y, "GFS");
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), -300);
        }, this);
        
        
        this.input.keyboard.on('keyup', function(event){
            if(event.key == '2'){
                this.scene.start('scene2');
            }
        }, this)
    }
    
    update(delta){
        if(this.keys.key_W.isDown){
            this.image.y--;
        }
        if(this.keys.key_A.isDown){
            this.image.x--;
        }
        if(this.keys.key_S.isDown){
            this.image.y++;
        }
        if(this.keys.key_D.isDown){
            this.image.x++;
        }
    }
}