class Controller {
  beforeUpdate(dT) {}
  afterUpdate(dT) {}
  attachSession(session) { throw new Error('Not implemented'); }
  getControlState() { throw new Error('Not implemented'); }
  getX() { throw new Error('Not implemented'); }
  getY() { throw new Error('Not implemented'); }
  onMinePress() { throw new Error('Not implemented'); }
  onMineHold() { throw new Error('Not implemented'); }
  onMineRelease() { throw new Error('Not implemented'); }
}

export default Controller;
