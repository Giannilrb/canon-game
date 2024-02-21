class Projectile {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    push()
    fill(225,79,123)
    strokeWeight(3)    
    circle(this.x, this.y, 8);
    pop()
  }
}