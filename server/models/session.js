import EventEmitter from 'eventemitter3';

const Session = (connection) => {
  let self = null;

  let info = {
    name: '...',
  };
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

  const setName = (name) => {
    info.name = name;
  };

  const publish = (channel, data) => {
    connection.send(JSON.stringify({ channel, data }));
  };

  self = {
    close,
    error,
    emit,
    on,
    off,
    getConnection,
    setName,
    publish,
  };

  return self;
};

export default Session;
