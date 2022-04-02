import Controller from './controller.js';
import ControlState from '../../../shared/states/control-state.js';

class MKBController extends Controller {
  constructor() {
    super();
    this.initialize();
    this.ix = 0;
    this.iy = 0;
    this.pressedKeys = {};
    this.prevPressedKeys = { 'Tab': 0, 'KeyE': 0 };
    this.mouseInfo = { 'x': 0, 'y': 0 };
    this.prevMouseInfo = { 'x': 0, 'y': 0 };
    this.controlState = ControlState();
  }

  initialize() {
    this._onKeyUp = this.onKeyUp.bind(this);
    this._onKeyDown = this.onKeyDown.bind(this);
    this._onMouseDown = this.onMouseDown.bind(this);
    this._onMouseUp = this.onMouseUp.bind(this);
    this._onMouseMove = this.onMouseMove.bind(this);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('mouseup', this._onMouseUp);
    window.addEventListener('mousemove', this._onMouseMove);
  }

  cleanup() {
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('mousedown', this._onMouseDown);
    window.removeEventListener('mouseup', this._onMouseUp);
    window.removeEventListener('mousemove', this._onMouseMove);
  }

  beforeUpdate(dT) {
    // X,Y controls
    let hasX = false;
    let hasY = false;
    if (this.pressedKeys['KeyA']) { this.ix -= 15 * dT; hasX = true; }
    if (this.pressedKeys['KeyD']) { this.ix += 15 * dT; hasX = true; }
    if (this.pressedKeys['KeyS']) { this.iy -= 15 * dT; hasY = true; }
    if (this.pressedKeys['KeyW']) { this.iy += 15 * dT; hasY = true; }
    if (this.ix > 1) { this.ix = 1; }
    if (this.ix < -1) { this.ix = -1; }
    if (this.iy > 1) { this.iy = 1; }
    if (this.iy < -1) { this.iy = -1; }
    if (!hasX) { this.ix -= this.ix * 10.0 * dT; }
    if (!hasY) { this.iy -= this.iy * 10.0 * dT; }

    // Set ControlState values
    this.controlState.setControlX(this.getX());
    this.controlState.setControlY(this.getY());
    this.controlState.setControlMine(this.onMineHold());
  }

  afterUpdate(dT) {
    // Mouse
    this.prevMouseInfo['0'] = this.mouseInfo['0'];
    this.prevMouseInfo['x'] = this.mouseInfo['x'];
    this.prevMouseInfo['y'] = this.mouseInfo['y'];

    // Previous Keys
    this.prevPressedKeys['Tab'] = this.pressedKeys['Tab'];
    this.prevPressedKeys['KeyE'] = this.pressedKeys['KeyE'];
  }

  attachSession(session) {
    this.session = session;
    this.controlState = session.getControlState();
  }

  getControlState() {
    return this.controlState;
  }

  onKeyUp(e) {
    this.pressedKeys[e.code] = false;
  }

  onKeyDown(e) {
    if (e.code == 'Tab') {
      e.preventDefault();
    }
    this.pressedKeys[e.code] = true;
  }

  onMouseUp(e) {
    this.mouseInfo[e.button] = false;
  }

  onMouseDown(e) {
    this.mouseInfo[e.button] = true;
  }

  onMouseMove(e) {
    this.mouseInfo['x'] = e.x;
    this.mouseInfo['y'] = e.y;
  }

  getX() { return this.ix; }
  getY() { return this.iy; }

  onMinePress() { return this.mouseInfo['0'] && !this.prevMouseInfo['0']; }
  onMineHold() { return this.mouseInfo['0']; }
  onMineRelease() { return !this.mouseInfo['0'] && this.prevMouseInfo['0']; }

  onRigMenuPress() { return this.pressedKeys['Tab'] && !this.prevPressedKeys['Tab']; }
  onRigMenuHold() { return this.pressedKeys['Tab']; }
  onRigMenuRelease() { return !this.pressedKeys['Tab'] && this.prevPressedKeys['Tab']; }

  onBuyPress() { return this.pressedKeys['KeyE'] && !this.prevPressedKeys['KeyE']; }
  onBuyHold() { return this.pressedKeys['KeyE']; }
  onBuyRelease() { return !this.pressedKeys['KeyE'] && this.prevPressedKeys['KeyE']; }
}

export default MKBController;
