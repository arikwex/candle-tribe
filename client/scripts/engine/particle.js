import { context } from '../ui/screen.js';

class Particle {
  constructor(lx = 0, ly = 0, ls = 1, lt = 0) {
    this.anim = Math.random() * 1.0 + lt;
    this.heat = Math.random() * 0.3;
    this.x = (Math.random() - 0.5) * 5 +lx;
    this.y = (Math.random() - 0.5) * 5 + ly;
    this.vx = (Math.random() - 0.5) * 455 * ls;
    this.vy = (Math.random() - 0.5) * 455 * ls;
    this.sz = (Math.random() * 8 + 3) * ls;
    this.viscosity = Math.random() * 7 + 1;
    this.isDone = false;
  }

  update(dT) {
    this.anim += dT;
    this.heat += dT;

    this.x += this.vx * dT;
    this.y += this.vy * dT;
    this.vy -= 100 * dT;

    this.vx -= this.vx * this.viscosity * dT;
    this.vy -= this.vy * this.viscosity * dT;

    this.sz += this.sz * dT;

    context.save();
    context.translate(this.x, this.y);
    let h = 255;
    if (this.heat > 0.5) {
      h = Math.exp(-(this.heat - 0.5) * 5) * 200 + 50;
    }
    context.fillStyle = `rgba(${h}, ${h}, ${h}, ${Math.exp(-this.anim * 2)})`;
    context.beginPath();
    context.arc(0, 0, this.sz, 0, Math.PI * 2);
    context.fill();
    context.restore();

    if (this.anim > 2) {
      this.isDone = true;
    }
  }
}

export default Particle;