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
    this.health = 100
    this.isDead = false
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
    push()
    noFill()
    stroke(250,50)
   arc(this.x, this.y, 46, 46, 0, this.health * 0.0628);
   pop()
  }
  move(enemies) {
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
    
    enemies.forEach(enemy => {
      let{d, dx ,dy} = calculDistance(this,enemy)
      if ( d < 16+32){
        this.health = this.health - 15
        this.vx += -dx * 0.1
        this.vy += -dy * 0.1
,
        enemy.vx = dx * 0.1
        enemy.vy = dy * 0.1
        if (this.health<=0){
          background(0,150)
          textSize(72)
          textAlign(CENTER)
          fill(255,100,56)
          text('GAME OVER',width/2, height/2)
          textSize(20)
          text('refresh to play again', width/2 ,height/2+85)
          noLoop()
        }
      }
    })
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
      this.vx  += -this.canonX * 0.03
      this.vy += -this.canonY * 0.03
      this.timer = 0
    }
  }
}
