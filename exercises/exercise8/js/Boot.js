// Title screen
this.add.image(400, 300, 'bg');
emotionCircle = this.add.ellipse(400, 300, 800, 600, 0xff0000);
emotionCircleText = this.add.text(15, 150, 'Melansuko: The Decades Day Album', { fontSize: '40px', fill: '#ffffff ' });
let innerCircle = this.add.ellipse(400, 300, 300, 250, 0x000000);
let startGamePrompt = this.add.text(50, 450, 'Jump into the vinyl to start.', { fontSize: '40px', fill: '#ffffff' });
let gameVersion = this.add.text(50, 550, 'Game Version 0.1-alpha-2019.', { fontSize: '40px', fill: '#ffffff' });
