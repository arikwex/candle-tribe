import * as EventEmitter from 'eventemitter3';
import controllerManager from './controls/controllerManager.js';
import network from './network/network.js';

(() => {
  controllerManager.initialize();
  network.initialize();

  console.log('beep')
})();