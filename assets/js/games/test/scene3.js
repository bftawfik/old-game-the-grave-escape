class scene3 extends Phaser.Scene{
    constructor(){
        super({key: 'scene3'});
    }
    
    preload(){
        this.load.audio('hollywood', ['assets/mp3/Hollywood.mp3']);
    }
    
    create(){
        this.soundFX = this.sound.add('hollywood',{loop: 'true'});
        this.soundFX.play();
        
        
        this.input.keyboard.on("keyup_L", function(event){
            this.soundFX.loop = !this.soundFX.loop;
            console.log(this.soundFX.loop);
        }, this);
        
        
        this.input.keyboard.on("keyup_P", function(event){
            if(this.soundFX.isPlaying){
                this.soundFX.pause();
            }else{
                this.soundFX.resume();
            }
        }, this);
    }
    
    update(delta){

    }
}