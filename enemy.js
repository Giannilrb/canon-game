class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.agro = 512;
    this.hp = 100;
    this.isDead = false;
  }
  move(player) {
    if (this.isDead) {
      this.vx *= 0.93;
    this.vy *= 0.93;
    this.x += this.vx;
    this.y += this.vy;
    return
    };
    player.projectile.forEach((proj) => {
      let dx = this.x - proj.x;
      let dy = this.y - proj.y;
      let d = sqrt(dx * dx + dy * dy);
      if (d < 32 + 4) {
        this.vx += -dx * 0.1
        this.vy += -dy * 0.1       
        this.hp = this.hp - 3.5;
        if (this.hp < 0) {
          
          this.isDead = true;
        }
      }
    });
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    let s = dx * dx + dy * dy;
    let d = sqrt(s);

    if (d < this.agro / 2 + 16) {
      
      this.vx += dx * 0.0015;
      this.vy += dy * 0.0015;
      this.vx += random(-0.5, 0.5);
      this.vy += random(-0.5, 0.5);
    } else {
      this.vx += random(-1, 1);
      this.vy += random(-1, 1);
    }

    this.vx *= 0.93;
    this.vy *= 0.93;
    this.x += this.vx;
    this.y += this.vy;
  }
  draw() {
    push();
    fill(227, 98, 173);
    if (this.isDead) fill(127, 2, 73);
    strokeWeight(6);
    circle(this.x, this.y, 64);
    noFill();
    stroke(255, 255, 255, 50);
    circle(this.x, this.y, this.agro);
    if (!this.isDead) arc(this.x, this.y, 80, 80, 0, this.hp * 0.0628);
    pop();
  }
}
