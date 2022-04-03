import logger from './logger.js';
import router from './app/router.js';
import websocket from './app/websocket.js';
import game from './app/game.js';

router.initialize();
websocket.initialize();
game.initialize();