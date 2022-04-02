import MKBController from './MKBController.js';

class ControllerManager {
  initialize() {
    this.controllers = [];
    this.controllers.push(new MKBController());
  }

  get(controllerIndex) {
    return this.controllers[controllerIndex];
  }

  beforeUpdate(dT) {
    for (let i = 0; i < this.controllers.length; i++) {
      this.controllers[i].beforeUpdate(dT);
    }
  }

  afterUpdate(dT) {
    for (let i = 0; i < this.controllers.length; i++) {
      this.controllers[i].afterUpdate(dT);
    }
  }
}

export default new ControllerManager();