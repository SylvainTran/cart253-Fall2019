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
let allison;
let platforms;
let walls;
let cursors;
let emotionCircle // The representation of the main character's emotions
let emotionCircleText; // The label for the emotionCircle (which has no description but is warm vs. cold)
let cherryBlossomPetals = [];
let game = new Phaser.Game(config);
/**
  Preloads the scene assets. Phaser.js native.

*/
function preload ()
{
    this.load.image('bg', 'assets/images/bg.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('wall', 'assets/images/wall.png');
    this.load.spritesheet('dude', 'assets/images/melansuko.png', { frameWidth: 26, frameHeight: 48 });
}
/**
  Creates elements on the scene. Phaser.js native.

*/
function create ()
{
    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    //  A simple background for our game
    this.add.image(400, 300, 'bg');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(400, 0, 'ground').setScale(10).refreshBody();

    //The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    createPlayerAnimations(this.anims);

    // Allison - Controllable by player two
    allison = this.physics.add.sprite(700, 450, 'dude');
    allison.setBounce(0.2);
    allison.setCollideWorldBounds(true);

    // Play with the set size to move the wall if the player clicks on it
		walls = this.physics.add.staticImage(400, 400, 0, 0, 'wall');
    walls.setBounce(0.2);
    walls.setInteractive();
    walls.on('pointerdown', handleWallMouseClick, this);

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, walls);
    this.physics.add.collider(allison, platforms);
    this.physics.add.collider(allison, walls);

    // The emotion circle display (a heart) -- displayed above the playable zone with its text label
    emotionCircle = this.add.ellipse(400, 80, 150, 150, 0xff0000);
    emotionCircleText = this.add.text(300, 80, 'My daughter, Allison...', { fontSize: '16px', fill: '#ffffff ' });
    // Emotion changes each time the player breaks a wall between Melansuko and Allison

    // The heartbeat animation
    this.tweens.add({
        targets: [emotionCircle],
        scaleX: 0.5,
        scaleY: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
    });
}
function handleWallMouseClick() {
  console.log("Clicked on wall");
  walls.angle += 90;
  walls.refreshBody();
  triggerMemory();
}
function createPlayerAnimations(anims) {
  //  Our player animations, turning, walking left and walking right.
  anims.create({
      key: 'left',
      frames: anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });
  anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });
  anims.create({
      key: 'right',
      frames: anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });
}
function triggerMemory() {
  console.log("Memory triggered");
  let cherryBlossomPetals = [];
  const numberOfPetals = 200;
  for(let i = 0; i < numberOfPetals; i++) {
	  //context.physics.add.image(100, 400, 'wall');
  }
}
/**
  Updates the canvas every frame (equivalent of draw() in p5.js)

*/
function update ()
{
  // this.physics.world.collide(player, walls);
  // this.add.image(400, 300, 'bg');
  // this.physics.add.staticImage(0, 568, 'ground');
  // this.physics.add.staticImage(400, 568, 'ground').setScale(2).refreshBody();
	// this.physics.add.staticImage(400, 0, 'ground').setScale(10).refreshBody();
	// this.physics.add.staticImage(400, 400, 'wall');

  // for(let i = 0; i < 200; i++) {
  //   cherryBlossomPetals[i] = this.add.ellipse(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 5, 2, 0xff0000);
  // }
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
