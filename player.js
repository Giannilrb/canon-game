const FORCE = 0.5;
const COOLDOWN = 20
class Player {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.vx = 0;
    this.vy = 0;

    this.canonX = 0;
    this.canonY = 0;
    this.projectile = [];
    this.timer = 0;
  }
  draw() {
    fill(25, 67, 225);
    circle(this.x, this.y, 32);

    let dx = this.x - mouseX;
    let dy = this.y - mouseY;

    let angle = atan(dy / dx);

    if (dx < 0 && dy > 0) {
      angle = angle + PI;
    } else if (dx < 0 && dy < 0) {
      angle = angle + PI;
    } else if (dx > 0 && dy < 0) {
      angle = angle + TWO_PI;
    }
    let len = min(45, 28 + this.timer)
    let px = -len * cos(angle);
    let py = -len * sin(angle);

    this.canonX = px;
    this.canonY = py;
    strokeWeight(6);
    line(this.x, this.y, this.canonX + this.x, this.canonY + this.y);
    this.projectile.forEach((proj) => {
      proj.draw();
    });
  }
  move() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.vx = this.vx * 0.92;
    this.vy = this.vy * 0.92;
    this.projectile = this.projectile.filter((proj) => {
      if (proj.x > width || proj.x < 0) {
        return false;
      }
      if (proj.y > height || proj.y < 0) {
        return false;
      }

      return true;
    });
    this.projectile.forEach((proj) => {
      proj.move();
    });
  }
  input() {
    if (keyIsDown(68)) this.vx = this.vx + 1;
    if (keyIsDown(65)) this.vx = this.vx - 1;
    if (keyIsDown(87)) this.vy = this.vy - 1;
    if (keyIsDown(83)) this.vy = this.vy + 1;

    if (mouseIsPressed) {
      this.shoot();
    }
    this.timer++;
  }
  shoot() {
    if (this.timer > COOLDOWN) {
      
      this.projectile.push(
        new Projectile(
          this.x + this.canonX,
          this.y + this.canonY,

          this.canonX * FORCE,
          this.canonY * FORCE
        )
      );
      
      this.timer = 0
    }
  }
}
