import ux from '../ui/interface.js';
import bus from '../bus.js';
import network from '../network/network.js'
import { clear, context, canvas } from '../ui/screen.js';
import Particle from './particle.js';

const GameEngine = () => {
  const BOOM_TIME = 5;
  const REWICK_TIME = 200;
  let lit = false;
  let progress = 0;
  let respawning = 10;
  let timeSinceLastExplosion = 0;
  let boom = false;
  let boomAnim = 0;
  let tilt1 = Math.random() * 0.2 - 0.1;
  let tilt2 = Math.random() * 0.2 - 0.1;
  let particles = [];

  // view
  let backgroundR = 85;
  let backgroundG = 102;
  let backgroundB = 170;
  let viewScale = 2.5;

  function start() {
    ux.buildInterface();

    bus.on('ignite', () => { network.publish('ignite'); });
    bus.on('extinguish', () => { network.publish('extinguish'); });

    network.subscribe('visitor', (num) => ux.setVisitorNumber(num));
    network.subscribe('boom', (num) => {
      boom = true;
      boomAnim = 0;
      tilt1 = Math.random() * 0.6 - 0.3;
      tilt2 = Math.random() * 0.6 - 0.3;
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    });
    network.subscribe('ignite', () => { lit = true; });
    network.subscribe('extinguish', () => { lit = false; });
    network.subscribe('status', (data) => {
      lit = data.lit;
      progress = data.progress;
      respawning = data.respawning;
      timeSinceLastExplosion = data.timeSinceLastExplosion;
    });
  }

  function update(dT) {
    // Game update
    timeSinceLastExplosion += dT;
    if (respawning <= 0) {
      if (lit) {
        if (progress < 1) {
          progress += dT / BOOM_TIME;
        } else {
          progress = 1;
        }
      } else {
        if (progress > 0) {
          progress -= dT / REWICK_TIME;
        } else {
          progress = 0;
        }
      }
    }
    ux.setTimeSinceLastExplosion(timeSinceLastExplosion);

    // Clear
    clear();
    let targetR, targetG, targetB;
    if (lit) {
      targetR = 200;
      targetG = 85;
      targetB = 85;
    } else {
      targetR = 85;
      targetG = 102;
      targetB = 170;
    }
    backgroundR += (targetR - backgroundR) * 3.0 * dT;
    backgroundG += (targetG - backgroundG) * 3.0 * dT;
    backgroundB += (targetB - backgroundB) * 3.0 * dT;
    const BG_COLOR = `rgb(${backgroundR}, ${backgroundG}, ${backgroundB})`;
    context.fillStyle = BG_COLOR;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // RESPAWNING
    let respawnFrame = false;
    if (respawning > 0) {
      respawnFrame = true;
      respawning -= dT;
      if (respawning < 0) {
        respawning = 0;
      }
      context.save();
      context.translate(-canvas.width * respawning * respawning * 0.7, 0);
    }

    // Bomb wick
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.scale(viewScale, viewScale);
    context.lineWidth = 8;
    context.strokeStyle = '#fff';
    context.beginPath();
    context.lineTo(-33, -33);
    context.bezierCurveTo(-80, -80, -50, 10, -100, -25);
    context.stroke();
    // Hide burnt wick
    const t = 1 - progress;
    let x0 = -33, y0 = -33;
    let cp0x = -80, cp0y = -80;
    let cp1x = -50, cp1y = 10;
    let x1 = -100, y1 = -25;
    let fx = Math.pow(1-t, 3) * x0 +
             3 * t * Math.pow(1 - t, 2) * cp0x +
             3 * t * t * (1 - t) * cp1x +
             t * t * t * x1;
    context.fillStyle = BG_COLOR;
    context.fillRect(x1 - 10, y1 - 30, fx - (x1 - 10) + 0.4, 150);
    // bomb shape
    context.fillStyle = '#333';
    context.beginPath();
    context.arc(0, 0, 40, 0, Math.PI * 2);
    context.fill();
    context.translate(-27, -27);
    context.rotate(-45 / 57.3);
    context.fillRect(-15, -10, 30, 20);
    context.restore();

    // Flame
    if (lit) {
      context.save();
      context.translate(canvas.width/2, canvas.height/2);
      context.scale(viewScale, viewScale);
      // Bezier placement of wick
      const t = 1 - progress;
      let x0 = -33, y0 = -33;
      let cp0x = -80, cp0y = -80;
      let cp1x = -50, cp1y = 10;
      let x1 = -100, y1 = -25;
      let fx = Math.pow(1-t, 3) * x0 +
               3 * t * Math.pow(1 - t, 2) * cp0x +
               3 * t * t * (1 - t) * cp1x +
               t * t * t * x1;
      let fy = Math.pow(1-t, 3) * y0 +
               3 * t * Math.pow(1 - t, 2) * cp0y +
               3 * t * t * (1 - t) * cp1y +
               t * t * t * y1;
      context.translate(fx, fy);
      //
      context.lineWidth = 2;
      for (let i = 0; i < 20; i++) {
        const r = Math.random() * 50 + 200;
        const g = Math.min(r, Math.random() * 100 + 150);
        const b = Math.random() * 40 + 40;
        const rad = Math.random() * 20 + 5;
        const angle = Math.random() * 6.28;
        context.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad);
        context.stroke();
      }
      context.restore();
    }

    if (respawnFrame) {
      context.restore();
    }

    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.scale(viewScale, viewScale);

    const PULSE_COLOR = `rgba(80, 190, 250, ${Math.exp(-boomAnim * 2.0)})`;
    const R = (1 - Math.exp(-boomAnim * 3.0)) * 230;
    if (boom) {
      boomAnim += dT;
      // Back Pulse
      context.strokeStyle = PULSE_COLOR;
      context.lineWidth = 8;
      context.beginPath();
      context.ellipse(0, -10 * boomAnim, R, R / 4, tilt1, Math.PI, 0);
      context.stroke();
      context.beginPath();
      context.ellipse(0, 10 * boomAnim, R * 0.6, R / 4 * 0.6, tilt2, Math.PI, 0);
      context.stroke();
    }

    // Flame + Smoke
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(dT);
    }
    particles = particles.filter((p) => !p.isDone);

    if (boom) {
      // Front Pulse
      context.strokeStyle = PULSE_COLOR;
      context.lineWidth = 8;
      context.beginPath();
      context.ellipse(0, -10 * boomAnim, R, R / 4, tilt1, 0, Math.PI);
      context.stroke();
      context.beginPath();
      context.ellipse(0, 10 * boomAnim, R * 0.6, R / 4 * 0.6, tilt2, 0, Math.PI);
      context.stroke();
    }
    context.restore();
  }

  return {
    start,
    update,
  };
};

export default GameEngine;