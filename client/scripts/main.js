import * as EventEmitter from 'eventemitter3';
import controllerManager from './controls/controllerManager.js';
import network from './network/network.js';
import GameEngine from './engine/game-engine.js';

const engine = GameEngine();
let prevTime = 0;

function gameloop(time) {
  const dT = Math.min((time - prevTime) / 1000, 0.3);
  engine.update(dT);
  prevTime = time;
  window.requestAnimationFrame(gameloop);
}

controllerManager.initialize();
network.initialize();

engine.start();
window.requestAnimationFrame(gameloop);