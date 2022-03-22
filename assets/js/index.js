const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.7;

class Player {
  constructor() {
    this.position = {
      x: 400,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }

    this.width = 30;
    this.height = 30;
  }
  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.position.x,
      this.position.y, this.width,
      this.height)
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;

    } else {
      this.velocity.y = 0
    }

  }
}

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y
    }

    this.width = 180;
    this.height = 20;

  }
  draw() {
    context.fillStyle = 'transparent'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const player = new Player();
const platforms = [new Platform({ x: 300, y: 610 }), new Platform({ x: 480, y: 610 }),
new Platform({ x: 660, y: 610 }), new Platform({ x: 840, y: 610 }),
new Platform({ x: 1020, y: 610 }), new Platform({ x: 1180, y: 610 }),
new Platform({ x: 80, y: 460 }), new Platform({ x: 150, y: 460 }),]

const key = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
  up: {
    pressed: false
  }
}

let scrollOffset = 0;

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)
  player.update();
  platforms.forEach((platform) => {
    platform.draw();
  })


  if (key.right.pressed && player.position.x <= (canvas.width - 40)) {
    player.velocity.x = 10
  } else if (key.left.pressed && player.position.x > ((canvas.width - canvas.width) + 40)) {
    player.velocity.x = -10

  } else {
    player.velocity.x = 0

  }
  platforms.forEach((platform) => {
    if (player.position.y + player.height <=
      platform.position.y && player.position.y
      + player.height + player.velocity.y >=
      platform.position.y && player.position.x
      + player.width >= platform.position.x &&
      player.position.x <= platform.position.x
      + platform.width) {
      player.velocity.y = 0;
    }
  })

}

player.update();
animate();

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 65: /* left */
      key.left.pressed = true;
      console.log(key.left.pressed);
      break;
    case 68: /* right */
      key.right.pressed = true;
      break;
    case 87: /* up */
      player.velocity.y = -15;
      break;
  }
})
addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 65: /* left */
      key.left.pressed = false;
      console.log(key.left.pressed);
      break;
    case 68: /* right */
      key.right.pressed = false;
      break;
    case 87: /* up */
      key.up.pressed = false;
      break;
  }
})