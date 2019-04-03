var Level1Scene = {
    
     preload: function(){
        console.log("preload");
    },
    
    
    create: function(){
        this.game.stage.backgroundColor = 0x4488cc;

    // The radius of the circle of light
    this.LIGHT_RADIUS = 100;


    // Create the shadow texture
    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

    // Create an object that will use the bitmap as a texture
    var lightSprite = this.game.add.image(0, 0, this.shadowTexture);

    // Set the blend mode to MULTIPLY. This will darken the colors of
    // everything below this sprite.
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    // Simulate a pointer click/tap input at the center of the stage
    // when the example begins running.
    this.game.input.activePointer.x = this.game.width/2;
    this.game.input.activePointer.y = this.game.height/2;

        
    },
    
    
    update: function(){
//        console.log("update");
            this.updateShadowTexture();

    },
    
    updateShadowTexture:function() {
    // This function updates the shadow texture (this.shadowTexture).
    // First, it fills the entire texture with a dark shadow color.
    // Then it draws a white circle centered on the pointer position.
    // Because the texture is drawn to the screen using the MULTIPLY
    // blend mode, the dark areas of the texture make all of the colors
    // underneath it darker, while the white area is unaffected.

    // Draw shadow
    this.shadowTexture.context.fillStyle = 'rgb(255, 255, 0)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    // Draw circle of light
//    this.shadowTexture.context.beginPath();
//    this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
//    this.shadowTexture.context.arc(this.game.input.activePointer.x, this.game.input.activePointer.y,
//        this.LIGHT_RADIUS, 0, Math.PI*2);
//        
//        this.shadowTexture.context.arc(this.game.input.activePointer.x+100, this.game.input.activePointer.y,
//        this.LIGHT_RADIUS, 0, Math.PI*2);
//    this.shadowTexture.context.fill();
//
//    // This just tells the engine it should update the texture cache
//    this.shadowTexture.dirty = true;
        
    //-----------------------------------------------------------------------------------------------------------------------------------------   
//    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
//    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
    var radius = 100 + this.game.rnd.integerInRange(1,10),
        heroX = this.game.input.activePointer.x,
        heroY = this.game.input.activePointer.y;
    // Draw circle of light with a soft edge    
    var gradient = this.shadowTexture.context.createRadialGradient(heroX, heroY, 100 * 0.75, heroX, heroY, radius);
    var gradient2 = this.shadowTexture.context.createRadialGradient(heroX+100, heroY, 100 * 0.75, heroX+100, heroY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');   
        
    gradient2.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient2.addColorStop(1, 'rgba(255, 255, 255, 0.0)'); 
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;    
    this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
    this.shadowTexture.context.fill();    
        
    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient2;
    this.shadowTexture.context.arc(heroX+100, heroY, radius, 0, Math.PI*2, false);
    this.shadowTexture.context.fill();    
    // This just tells the engine it should update the texture cache    
    this.shadowTexture.dirty = true;
}

    
}

//create: function(){    
//    this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);    
//    // Create an object that will use the bitmap as a texture    
//    this.lightSprite = this.game.add.image(this.game.camera.x, this.game.camera.y, this.shadowTexture);    
//    // Set the blend mode to MULTIPLY. This will darken the colors of    
//    // everything below this sprite.    
//    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
//},
//update: function(){
//    this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
//    this.updateShadowTexture();
//},
//updateShadowTexture: function(){    
//    // Draw shadow    
//    this.shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
//    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);
//    var radius = 100 + this.game.rnd.integerInRange(1,10),heroX = this.hero.x - this.game.camera.x,heroY = this.hero.y - this.game.camera.y;
//    // Draw circle of light with a soft edge    
//    var gradient =        this.shadowTexture.context.createRadialGradient(heroX, heroY, 100 * 0.75, heroX, heroY, radius);
//    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
//    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');    
//    this.shadowTexture.context.beginPath();
//    this.shadowTexture.context.fillStyle = gradient;    
//    this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
//    this.shadowTexture.context.fill();    
//    // This just tells the engine it should update the texture cache    
//    this.shadowTexture.dirty = true;
//}












































