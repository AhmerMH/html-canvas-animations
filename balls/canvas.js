let canvas = document.querySelector('canvas');
let clientWidth = window.innerWidth;
let clientHeight = window.innerHeight;

canvas.width = clientWidth;
canvas.height = clientHeight;

let c = canvas.getContext('2d');

const MAX_RADIUS_LIMIT = 50;
const MIN_RADIUS_LIMIT = 2;

const colors = [
  '#FFBF00',
  '#FF7F50',
  '#DE3163',
  '#9FE2BF',
  '#40E0D0',
  '#6495ED',
  '#CCCCFF'
];

const mouse = { x: null, y: null };

// Event listeners

// resize event to redraw the circles
window.addEventListener('resize', () => {
  clientWidth = window.innerWidth;
  clientHeight = window.innerHeight;
  canvas.width = clientWidth;
  canvas.height = clientHeight - TOP_NAV_HEIGHT;
  init();
});

// mouse event for interactivity
window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});


const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const getRandomXCordinate = (radius) => {
  return Math.random() * (clientWidth - radius * 2) + radius;
};

const getRandomYCordinate = (radius) => {
  return Math.random() * (clientHeight - radius * 2) + radius;
};

const getRandomRadius = (minRange = MIN_RADIUS_LIMIT, maxRange = 20) => {
  return Math.random() * (maxRange - minRange) + minRange;
};

const getRandomVelocity = (minRange = 1, maxRange = 1) => {
  return Math.random() * (maxRange - minRange) + minRange;
};

function Ball(radius, dx, dy) {
  this.x = getRandomXCordinate(radius);
  this.y = getRandomYCordinate(radius);
  this.radius = radius;
  this.dx = dx; // x velocity
  this.dy = dy; // y velocity
  this.color = getRandomColor();
  this.initialRadius = this.radius;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function () {
    if (this.x + this.radius > clientWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > clientHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < MAX_RADIUS_LIMIT) {
        this.radius += 1;
      }
    } else if (this.radius > this.initialRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
};

let ball = new Ball(25, 5, 5);

let balls = [];
const noOfBalls = 50;

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, clientWidth, clientHeight);

  balls.forEach(ball => {
    ball.update();
  });

};

// init
const init = () => {
  balls = [];
  for (let index = 0; index < noOfBalls; index++) {
    balls.push(
      new Ball(getRandomRadius(),
        getRandomVelocity() * (index % 2 === 0 ? -1 : 1),
        getRandomVelocity() * (index % 6 === 0 ? -1 : 1))
    );
  }
};


init();
animate();
