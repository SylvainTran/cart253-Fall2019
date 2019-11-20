/*****************
Melansuko: The Decades Day Album
Author: Sylvain Tran

++Visualization of the main character's emotions.

++Trigonometry play for animations and some level obstacles

++Using the environment to tell a story? Phaser.js to do this.

******************/
/**
  The config file. Will be refactored later.

*/
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let player;
let platforms;
let cursors;
let emotionCircle // The representation of the main character's emotions
let emotionCircleText; // The label for the emotionCircle (which has no description but is warm vs. cold)
let game = new Phaser.Game(config);
/**
  Preloads the scene assets. Phaser.js native.

*/
function preload ()
{
    this.load.image('bg', 'assets/images/bg.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.spritesheet('melansuko', 'assets/images/melansuko.png', { frameWidth: 32, frameHeight: 48 });
}
/**
  Creates elements on the scene. Phaser.js native.

*/
function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'bg');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    // The ceiling which also contains the emotion circle
    platforms.create(400, 0, 'ground').setScale(10).refreshBody();
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'melansuko');
    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('melansuko', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'melansuko', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('melansuko', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    // The emotion circle display (a heart) -- displayed above the playable zone with its text label
    emotionCircle = this.add.ellipse(400, 80, 150, 150, 0xff0000);
    emotionCircleText = this.add.text(355, 80, 'I feel...', { fontSize: '16px', fill: '#000' });
    // The heartbeat animation
    this.tweens.add({
        targets: emotionCircle,
        scaleX: 0.5,
        scaleY: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });
}
/**
  Updates the canvas every frame (equivalent of draw() in p5.js)

*/
function update ()
{
  // Animation + input handling. Sets velocity according to directional input and plays the corresponding animation on the spritesheet.
  if (cursors.left.isDown)
  {
      player.setVelocityX(-160);
      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(160);
      player.anims.play('right', true);
  }
  else
  {
      player.setVelocityX(0);
      player.anims.play('turn');
  }
  // Jumping
  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330);
  }
}
