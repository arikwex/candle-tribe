import EventEmitter from 'eventemitter3';

export default (() => {
  const emitter = new EventEmitter();
  const on = emitter.on.bind(emitter);
  const off = emitter.off.bind(emitter);
  const emit = emitter.emit.bind(emitter);
  // TODO switch based on origin
  // const websocketURL = location.origin.replace(/^http:/, 'ws:') + '/connect';
  const websocketURL = 'ws://3.16.38.130:3000/connect';
  let ws;
  let isOpen = false;

  function initialize() {
    connect();
  }

  function connect() {
    ws = new WebSocket(websocketURL);
    ws.onopen = () => {
      console.log('Connected!');
      isOpen = true;
    };
    ws.onclose = () => {
      console.warn('Closed');
      isOpen = false;
    };
    ws.onerror = () => {
      console.error('Error');
      isOpen = false;
    };
    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      emit(msg.channel, msg.data);
    };
  }

  function send(msg) {
    if (!isOpen) { return; }
    ws.send(JSON.stringify(msg));
  }

  function publish(channel, data = {}) {
    send({ channel, data });
  }

  function subscribe(channel, callback) {
    on(channel, callback);
  }

  function unsubscribe(channel, callback) {
    off(channel, callback);
  }

  return {
    initialize,
    send,
    publish,
    subscribe,
    unsubscribe
  };
})();