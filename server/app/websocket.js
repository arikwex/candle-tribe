import router from './router.js';
import { parse } from 'url';
import { WebSocketServer } from 'ws';
import logger from '../logger.js';
import Session from '../models/session.js';
import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();
const on = emitter.on.bind(emitter);
const emit = emitter.emit.bind(emitter);

let websocketServer;
let activeSessions = [];

function onUpgrade(request, socket, head) {
  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    websocketServer.emit('connection', websocket, request);
  });
}

function onConnection(websocketConnection, request) {
  const { pathname } = parse(request.url);
  const session = Session(websocketConnection);

  if (pathname === '/connect') {
    activeSessions.push(session);
    logger.success(`Client connected, N = ${getNumClients()}`);

    websocketConnection.on('message', (message) => {
      const parsedMessage = JSON.parse(message);
      emit(parsedMessage.channel, {
        session: session,
        data: parsedMessage.data
      });
    });

    websocketConnection.on('close', () => {
      session.close();
      activeSessions = activeSessions.filter((s) => s != session);
      logger.log(`Client disconnect, N = ${getNumClients()}`);
    });

    websocketConnection.on('error', (err) => {
      session.error(err);
      logger.error('Websocket error:', err);
    });
  } else {
    websocketConnection.close();
    logger.error('Invalid websocket connection path');
  }
}

function getNumClients() {
  return activeSessions.length;
}

function initialize() {
  websocketServer = new WebSocketServer({
    noServer: true
  });

  const httpServer = router.getServer();
  httpServer.on('upgrade', onUpgrade);
  websocketServer.on('connection', onConnection);

  logger.success('Websocket server configured');
  return websocketServer;
};

export default {
  initialize,
  on,
  getNumClients
}