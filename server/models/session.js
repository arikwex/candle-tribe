import EventEmitter from 'eventemitter3';
import logger from '../logger.js';
import visitor from './visitor.js';

const Session = (connection) => {
  let self = null;

  const visitorNumber = visitor.addVisitor();

  const emitter = new EventEmitter();
  const on = emitter.on.bind(emitter);
  const off = emitter.on.bind(emitter);
  const emit = emitter.emit.bind(emitter);

  const close = () => {
    emit('session:close', { session: self });
  };

  const error = (err) => {
    emit('session:error', { session: self, error: err });
  };

  const getConnection = () => {
    return connection;
  };

  const publish = (channel, data) => {
    try {
      connection.send(JSON.stringify({ channel, data }));
    } catch (e) {
      logger.error(e.message);
    }
  };

  const getVisitorNumber = () => {
    return visitorNumber;
  };

  self = {
    close,
    error,
    emit,
    on,
    off,
    getConnection,
    publish,
    getVisitorNumber,
  };

  return self;
};

export default Session;
