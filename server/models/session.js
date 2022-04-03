import EventEmitter from 'eventemitter3';

let visitorCounter = 1;
const Session = (connection) => {
  let self = null;

  const visitorNumber = visitorCounter++;

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
    connection.send(JSON.stringify({ channel, data }));
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
