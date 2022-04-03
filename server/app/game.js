import websocket from './websocket.js';
import logger from '../logger.js';

// TODO: EXPLOSION COUNTER
// TODO: LEADERBOARD?

// Game state
const BOOM_TIME = 5;
const REWICK_TIME = 200;
const RESPAWN_TIME = 3;
let lit = false;
let progress = 0;
let respawning = 0;
let timeSinceLastExplosion = 0;

function initialize() {
  websocket.on('session:connect', onConnect)
  websocket.on('ignite', ignite);
  websocket.on('extinguish', extinguish);

  const TICK_INTERVAL = 1000 / 60;
  setInterval(onTick, TICK_INTERVAL);

  const STATUS_INTERVAL = 5000;
  setInterval(status, STATUS_INTERVAL);
}

function onConnect({ session }) {
  session.publish('visitor', session.getVisitorNumber());
  session.publish('status', getStatusMessage());
}

function ignite({ session }) {
  if (!lit && respawning <= 0) {
    logger.log(`Ignited by visitor #${session.getVisitorNumber()}`);
    websocket.broadcast('ignite');
    lit = true;
  }
}

function extinguish({ session }) {
  if (lit && respawning <= 0) {
    logger.log(`Extinguished by visitor #${session.getVisitorNumber()}`);
    websocket.broadcast('extinguish');
    lit = false;
  }
}

function getStatusMessage() {
  return {
    lit: lit,
    progress: progress,
    respawning: respawning,
    timeSinceLastExplosion: timeSinceLastExplosion,
  };
}

function status() {
  websocket.broadcast('status', getStatusMessage());
}

let lastTick = Date.now();
function onTick() {
  let nowTick = Date.now();
  let dT = (nowTick - lastTick) / 1000;

  timeSinceLastExplosion += dT;

  // Respawning
  if (respawning > 0) {
    respawning -= dT;
    if (respawning <= 0) {
      progress = 0;
      lit = false;
      websocket.broadcast('respawn');
      status();
    }
  }
  // Main game
  else if (lit) {
    progress += dT / BOOM_TIME;
    if (progress >= 1) {
      progress = 0;
      lit = false;
      respawning = RESPAWN_TIME;
      timeSinceLastExplosion = 0;
      status();
      websocket.broadcast('boom');
    }
  }
  else if (!lit) {
    if (progress > 0) {
      progress -= dT / REWICK_TIME;
    } else {
      progress = 0;
    }
  }



  lastTick = nowTick;
}

export default {
  initialize
};