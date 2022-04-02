(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__)
          prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt])
          emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn)
          emitter._events[evt].push(listener);
        else
          emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0)
          emitter._events = new Events();
        else
          delete emitter._events[evt];
      }
      function EventEmitter3() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter3.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0)
          return names;
        for (name in events = this._events) {
          if (has.call(events, name))
            names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter3.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers)
          return [];
        if (handlers.fn)
          return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter3.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners)
          return 0;
        if (listeners.fn)
          return 1;
        return listeners.length;
      };
      EventEmitter3.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once)
            this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once)
              this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args)
                  for (j = 1, args = new Array(len - 1); j < len; j++) {
                    args[j - 1] = arguments[j];
                  }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter3.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter3.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter3.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length)
            this._events[evt] = events.length === 1 ? events[0] : events;
          else
            clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter3.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt])
            clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
      EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
      EventEmitter3.prefixed = prefix;
      EventEmitter3.EventEmitter = EventEmitter3;
      if (typeof module !== "undefined") {
        module.exports = EventEmitter3;
      }
    }
  });

  // client/scripts/main.js
  var EventEmitter2 = __toESM(require_eventemitter3(), 1);

  // client/scripts/controls/controller.js
  var Controller = class {
    beforeUpdate(dT) {
    }
    afterUpdate(dT) {
    }
    attachSession(session) {
      throw new Error("Not implemented");
    }
    getControlState() {
      throw new Error("Not implemented");
    }
    getX() {
      throw new Error("Not implemented");
    }
    getY() {
      throw new Error("Not implemented");
    }
    onMinePress() {
      throw new Error("Not implemented");
    }
    onMineHold() {
      throw new Error("Not implemented");
    }
    onMineRelease() {
      throw new Error("Not implemented");
    }
  };
  var controller_default = Controller;

  // shared/states/control-state.js
  function setControlX(v) {
    this.controlX = v;
  }
  function setControlY(v) {
    this.controlY = v;
  }
  function setControlMine(v) {
    this.controlMine = v;
  }
  function serialize() {
    return {
      controlX: this.controlX,
      controlY: this.controlY,
      controlMine: this.controlMine
    };
  }
  function sync(data) {
    this.controlX = data.controlX;
    this.controlY = data.controlY;
    this.controlMine = data.controlMine;
  }
  function ControlState() {
    return {
      controlX: 0,
      controlY: 0,
      controlMine: 0,
      setControlX,
      setControlY,
      setControlMine,
      serialize,
      sync
    };
  }
  var control_state_default = ControlState;

  // client/scripts/controls/MKBController.js
  var MKBController = class extends controller_default {
    constructor() {
      super();
      this.initialize();
      this.ix = 0;
      this.iy = 0;
      this.pressedKeys = {};
      this.prevPressedKeys = { "Tab": 0, "KeyE": 0 };
      this.mouseInfo = { "x": 0, "y": 0 };
      this.prevMouseInfo = { "x": 0, "y": 0 };
      this.controlState = control_state_default();
    }
    initialize() {
      this._onKeyUp = this.onKeyUp.bind(this);
      this._onKeyDown = this.onKeyDown.bind(this);
      this._onMouseDown = this.onMouseDown.bind(this);
      this._onMouseUp = this.onMouseUp.bind(this);
      this._onMouseMove = this.onMouseMove.bind(this);
      window.addEventListener("keyup", this._onKeyUp);
      window.addEventListener("keydown", this._onKeyDown);
      window.addEventListener("mousedown", this._onMouseDown);
      window.addEventListener("mouseup", this._onMouseUp);
      window.addEventListener("mousemove", this._onMouseMove);
    }
    cleanup() {
      window.removeEventListener("keyup", this._onKeyUp);
      window.removeEventListener("keydown", this._onKeyDown);
      window.removeEventListener("mousedown", this._onMouseDown);
      window.removeEventListener("mouseup", this._onMouseUp);
      window.removeEventListener("mousemove", this._onMouseMove);
    }
    beforeUpdate(dT) {
      let hasX = false;
      let hasY = false;
      if (this.pressedKeys["KeyA"]) {
        this.ix -= 15 * dT;
        hasX = true;
      }
      if (this.pressedKeys["KeyD"]) {
        this.ix += 15 * dT;
        hasX = true;
      }
      if (this.pressedKeys["KeyS"]) {
        this.iy -= 15 * dT;
        hasY = true;
      }
      if (this.pressedKeys["KeyW"]) {
        this.iy += 15 * dT;
        hasY = true;
      }
      if (this.ix > 1) {
        this.ix = 1;
      }
      if (this.ix < -1) {
        this.ix = -1;
      }
      if (this.iy > 1) {
        this.iy = 1;
      }
      if (this.iy < -1) {
        this.iy = -1;
      }
      if (!hasX) {
        this.ix -= this.ix * 10 * dT;
      }
      if (!hasY) {
        this.iy -= this.iy * 10 * dT;
      }
      this.controlState.setControlX(this.getX());
      this.controlState.setControlY(this.getY());
      this.controlState.setControlMine(this.onMineHold());
    }
    afterUpdate(dT) {
      this.prevMouseInfo["0"] = this.mouseInfo["0"];
      this.prevMouseInfo["x"] = this.mouseInfo["x"];
      this.prevMouseInfo["y"] = this.mouseInfo["y"];
      this.prevPressedKeys["Tab"] = this.pressedKeys["Tab"];
      this.prevPressedKeys["KeyE"] = this.pressedKeys["KeyE"];
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
      if (e.code == "Tab") {
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
      this.mouseInfo["x"] = e.x;
      this.mouseInfo["y"] = e.y;
    }
    getX() {
      return this.ix;
    }
    getY() {
      return this.iy;
    }
    onMinePress() {
      return this.mouseInfo["0"] && !this.prevMouseInfo["0"];
    }
    onMineHold() {
      return this.mouseInfo["0"];
    }
    onMineRelease() {
      return !this.mouseInfo["0"] && this.prevMouseInfo["0"];
    }
    onRigMenuPress() {
      return this.pressedKeys["Tab"] && !this.prevPressedKeys["Tab"];
    }
    onRigMenuHold() {
      return this.pressedKeys["Tab"];
    }
    onRigMenuRelease() {
      return !this.pressedKeys["Tab"] && this.prevPressedKeys["Tab"];
    }
    onBuyPress() {
      return this.pressedKeys["KeyE"] && !this.prevPressedKeys["KeyE"];
    }
    onBuyHold() {
      return this.pressedKeys["KeyE"];
    }
    onBuyRelease() {
      return !this.pressedKeys["KeyE"] && this.prevPressedKeys["KeyE"];
    }
  };
  var MKBController_default = MKBController;

  // client/scripts/controls/controllerManager.js
  var ControllerManager = class {
    initialize() {
      this.controllers = [];
      this.controllers.push(new MKBController_default());
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
  };
  var controllerManager_default = new ControllerManager();

  // client/scripts/network/network.js
  var import_eventemitter3 = __toESM(require_eventemitter3(), 1);
  var network_default = (() => {
    const emitter = new import_eventemitter3.default();
    const on = emitter.on.bind(emitter);
    const off = emitter.off.bind(emitter);
    const emit = emitter.emit.bind(emitter);
    const websocketURL = location.origin.replace(/^http:/, "ws:") + "/connect";
    let ws;
    let isOpen = false;
    function initialize() {
      connect();
    }
    function connect() {
      ws = new WebSocket(websocketURL);
      ws.onopen = () => {
        console.log("Connected!");
        isOpen = true;
      };
      ws.onclose = () => {
        console.warn("Closed");
        isOpen = false;
      };
      ws.onerror = () => {
        console.error("Error");
        isOpen = false;
      };
      ws.onmessage = (evt) => {
        const msg = JSON.parse(evt.data);
        emit(msg.channel, msg.data);
      };
    }
    function send(msg) {
      if (!isOpen) {
        return;
      }
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

  // client/scripts/main.js
  (() => {
    controllerManager_default.initialize();
    network_default.initialize();
    console.log("beep");
  })();
})();
