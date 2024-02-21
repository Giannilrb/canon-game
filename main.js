let p;
let enemies = [];
function setup() {
  createCanvas(innerWidth, innerHeight);
  p = new Player();
  enemies.push(new Enemy(random(0, width), random(0, height)));
  enemies.push(new Enemy(random(0, width), random(0, height)));
}

function draw() {
  background(65);
  enemies.forEach((e) => {
    e.draw();
    e.move(p);
  });
  p.move(enemies);
  p.draw();
  p.input();
}
