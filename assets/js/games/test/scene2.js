class scene2 extends Phaser.Scene{
    constructor(){
        super({key: 'scene2'});
    }
    
    preload(){
        
    }
    
    create(){
        this.text = this.add.text(0, 0, "Welcome. Scene 2 !", {font: "40px Impact"});
        
        
        var tween = this.tweens.add({
            targets: this.text,
            x: 200,
            y: 250,
            duration: 2000,
            ease: "Elastic",
            easerParams: [1.5, 0.5],
            delay: 1000,
            onComplete: function(src, tgt){
                tgt[0].x = 0;
                tgt[0].y = 0;
                tgt[0].setColor('blue');
            }
        }, this);
        
        
        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    }
    
    update(delta){
        if(this.key_1.isDown){
            this.scene.start('scene1');
        }
        if(this.key_3.isDown){
            this.scene.start('scene3');
        }
    }
}