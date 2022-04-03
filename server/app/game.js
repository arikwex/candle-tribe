import websocket from './websocket.js';
import logger from '../logger.js';
import fs from 'fs';
import visitor from '../models/visitor.js';

// TODO: EXPLOSION COUNTER
// TODO: LEADERBOARD?

// Game state
const BOOM_TIME = 5;
const REWICK_TIME = 20;
const RESPAWN_TIME = 3;
let lit = false;
let progress = 0;
let respawning = 0;
let timeSinceLastExplosion = 0;
let numExplosions = 0;
let wickBurned = 0;

function initialize() {
  loadGame();

  websocket.on('session:connect', onConnect)
  websocket.on('ignite', ignite);
  websocket.on('extinguish', extinguish);

  const TICK_INTERVAL = 1000 / 60;
  setInterval(onTick, TICK_INTERVAL);

  const STATUS_INTERVAL = 5000;
  setInterval(status, STATUS_INTERVAL);

  const SAVE_PERIOD = 10000;
  setInterval(saveGame, SAVE_PERIOD);
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
    websocket.broadcast('extinguish', { wickBurned: wickBurned });
    lit = false;
  }
}

function getStatusMessage() {
  return {
    lit: lit,
    progress: progress,
    respawning: respawning,
    timeSinceLastExplosion: timeSinceLastExplosion,
    numExplosions: numExplosions,
    wickBurned: wickBurned,
    activeVisitors: websocket.getNumClients(),
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
      numExplosions += 1;
      status();
      websocket.broadcast('boom');
    } else {
      wickBurned += dT * 1.0;
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

function saveGame() {
  try {
    fs.writeFileSync('savegame.txt', JSON.stringify({
      timeSinceLastExplosion: timeSinceLastExplosion,
      numExplosions: numExplosions,
      wickBurned: wickBurned,
      numVisitors: visitor.getVisitorCount(),
    }));
  } catch (err) {
    logger.error(err.message);
  }
}

function loadGame() {
  try {
    if (!fs.existsSync('savegame.txt')) {
      return;
    }
    const data = JSON.parse(fs.readFileSync('savegame.txt'));
    timeSinceLastExplosion = data.timeSinceLastExplosion;
    numExplosions = data.numExplosions;
    wickBurned = data.wickBurned;
    visitor.setVisitorCount(data.numVisitors);
  } catch (err) {
    logger.error(err.message);
  }
}

export default {
  initialize
};