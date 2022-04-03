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
      function EE(fn, context2, once) {
        this.fn = fn;
        this.context = context2;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context2, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context2 || emitter, once), evt = prefix ? prefix + event : event;
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
      function EventEmitter4() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter4.prototype.eventNames = function eventNames() {
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
      EventEmitter4.prototype.listeners = function listeners(event) {
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
      EventEmitter4.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners)
          return 0;
        if (listeners.fn)
          return 1;
        return listeners.length;
      };
      EventEmitter4.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
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
      EventEmitter4.prototype.on = function on(event, fn, context2) {
        return addListener(this, event, fn, context2, false);
      };
      EventEmitter4.prototype.once = function once(event, fn, context2) {
        return addListener(this, event, fn, context2, true);
      };
      EventEmitter4.prototype.removeListener = function removeListener(event, fn, context2, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context2 || listeners.context === context2)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context2 && listeners[i].context !== context2) {
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
      EventEmitter4.prototype.removeAllListeners = function removeAllListeners(event) {
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
      EventEmitter4.prototype.off = EventEmitter4.prototype.removeListener;
      EventEmitter4.prototype.addListener = EventEmitter4.prototype.on;
      EventEmitter4.prefixed = prefix;
      EventEmitter4.EventEmitter = EventEmitter4;
      if (typeof module !== "undefined") {
        module.exports = EventEmitter4;
      }
    }
  });

  // client/scripts/main.js
  var EventEmitter3 = __toESM(require_eventemitter3(), 1);

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
    const websocketURL = "ws://3.16.38.130:3000/connect";
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

  // client/scripts/bus.js
  var import_eventemitter32 = __toESM(require_eventemitter3(), 1);
  var bus_default = (() => {
    const e = new import_eventemitter32.default();
    return e;
  })();

  // client/scripts/ui/interface.js
  function buildInterface() {
    const menu = document.createElement("div");
    menu.id = "menu";
    document.body.appendChild(menu);
    const igniteButton = document.createElement("button");
    igniteButton.innerText = "\u{1F525} Ignite";
    menu.appendChild(igniteButton);
    const extinguishButton = document.createElement("button");
    extinguishButton.innerText = "\u{1F9EF} Extinguish";
    menu.appendChild(extinguishButton);
    igniteButton.onclick = function() {
      bus_default.emit("ignite");
    };
    extinguishButton.onclick = function() {
      bus_default.emit("extinguish");
    };
  }
  function setVisitorNumber(num) {
    let txt = "" + num;
    while (txt.length < 5) {
      txt = "0" + txt;
    }
    const dom = document.getElementsByClassName("visitor-number")[0];
    if (dom) {
      dom.innerText = `Visitor #${txt}`;
    }
  }
  function setTimeSinceLastExplosion(t) {
    let hr = Math.floor(t / 3600);
    t -= hr * 3600;
    let min = Math.floor(t / 60);
    t -= min * 60;
    let sec = Math.floor(t);
    let strHr = "" + parseInt(hr);
    if (strHr.length < 2) {
      strHr = "0" + strHr;
    }
    let strMin = "" + parseInt(min);
    if (strMin.length < 2) {
      strMin = "0" + strMin;
    }
    let strSec = "" + parseInt(sec);
    if (strSec.length < 2) {
      strSec = "0" + strSec;
    }
    let txt = strHr + ":" + strMin + ":" + strSec;
    const dom = document.getElementsByClassName("incident-counter")[0];
    if (dom) {
      dom.innerText = txt;
    }
  }
  var interface_default = {
    buildInterface,
    setVisitorNumber,
    setTimeSinceLastExplosion
  };

  // client/scripts/ui/screen.js
  var canvas = document.getElementById("ui");
  var context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.imageSmoothingEnabled = false;
  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    bus_default.emit("resize");
  };

  // client/scripts/engine/particle.js
  var Particle = class {
    constructor() {
      this.anim = Math.random() * 1;
      this.heat = Math.random() * 0.3;
      this.x = (Math.random() - 0.5) * 5;
      this.y = (Math.random() - 0.5) * 5;
      this.vx = (Math.random() - 0.5) * 455;
      this.vy = (Math.random() - 0.5) * 455;
      this.sz = Math.random() * 8 + 3;
      this.viscosity = Math.random() * 7 + 1;
      this.isDone = false;
    }
    update(dT) {
      this.anim += dT;
      this.heat += dT;
      this.x += this.vx * dT;
      this.y += this.vy * dT;
      this.vy -= 100 * dT;
      this.vx -= this.vx * this.viscosity * dT;
      this.vy -= this.vy * this.viscosity * dT;
      this.sz += this.sz * dT;
      context.save();
      context.translate(this.x, this.y);
      let h = 255;
      if (this.heat > 0.5) {
        h = Math.exp(-(this.heat - 0.5) * 5) * 200 + 50;
      }
      context.fillStyle = `rgba(${h}, ${h}, ${h}, ${Math.exp(-this.anim * 2)})`;
      context.beginPath();
      context.arc(0, 0, this.sz, 0, Math.PI * 2);
      context.fill();
      context.restore();
      if (this.anim > 2) {
        this.isDone = true;
      }
    }
  };
  var particle_default = Particle;

  // client/scripts/engine/game-engine.js
  var GameEngine = () => {
    const BOOM_TIME = 5;
    const REWICK_TIME = 200;
    let lit = false;
    let progress = 0;
    let respawning = 10;
    let timeSinceLastExplosion = 0;
    let boom = false;
    let boomAnim = 0;
    let tilt1 = Math.random() * 0.2 - 0.1;
    let tilt2 = Math.random() * 0.2 - 0.1;
    let particles = [];
    let backgroundR = 85;
    let backgroundG = 102;
    let backgroundB = 170;
    let viewScale = 2.5;
    function start() {
      interface_default.buildInterface();
      bus_default.on("ignite", () => {
        network_default.publish("ignite");
      });
      bus_default.on("extinguish", () => {
        network_default.publish("extinguish");
      });
      network_default.subscribe("visitor", (num) => interface_default.setVisitorNumber(num));
      network_default.subscribe("boom", (num) => {
        boom = true;
        boomAnim = 0;
        tilt1 = Math.random() * 0.6 - 0.3;
        tilt2 = Math.random() * 0.6 - 0.3;
        for (let i = 0; i < 100; i++) {
          particles.push(new particle_default());
        }
      });
      network_default.subscribe("ignite", () => {
        lit = true;
      });
      network_default.subscribe("extinguish", () => {
        lit = false;
      });
      network_default.subscribe("status", (data) => {
        lit = data.lit;
        progress = data.progress;
        respawning = data.respawning;
        timeSinceLastExplosion = data.timeSinceLastExplosion;
      });
    }
    function update(dT) {
      timeSinceLastExplosion += dT;
      if (respawning <= 0) {
        if (lit) {
          if (progress < 1) {
            progress += dT / BOOM_TIME;
          } else {
            progress = 1;
          }
        } else {
          if (progress > 0) {
            progress -= dT / REWICK_TIME;
          } else {
            progress = 0;
          }
        }
      }
      interface_default.setTimeSinceLastExplosion(timeSinceLastExplosion);
      clear();
      let targetR, targetG, targetB;
      if (lit) {
        targetR = 200;
        targetG = 85;
        targetB = 85;
      } else {
        targetR = 85;
        targetG = 102;
        targetB = 170;
      }
      backgroundR += (targetR - backgroundR) * 3 * dT;
      backgroundG += (targetG - backgroundG) * 3 * dT;
      backgroundB += (targetB - backgroundB) * 3 * dT;
      const BG_COLOR = `rgb(${backgroundR}, ${backgroundG}, ${backgroundB})`;
      context.fillStyle = BG_COLOR;
      context.fillRect(0, 0, canvas.width, canvas.height);
      let respawnFrame = false;
      if (respawning > 0) {
        respawnFrame = true;
        respawning -= dT;
        if (respawning < 0) {
          respawning = 0;
        }
        context.save();
        context.translate(-canvas.width * respawning * respawning * 0.7, 0);
      }
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.scale(viewScale, viewScale);
      context.lineWidth = 8;
      context.strokeStyle = "#fff";
      context.beginPath();
      context.lineTo(-33, -33);
      context.bezierCurveTo(-80, -80, -50, 10, -100, -25);
      context.stroke();
      const t = 1 - progress;
      let x0 = -33, y0 = -33;
      let cp0x = -80, cp0y = -80;
      let cp1x = -50, cp1y = 10;
      let x1 = -100, y1 = -25;
      let fx = Math.pow(1 - t, 3) * x0 + 3 * t * Math.pow(1 - t, 2) * cp0x + 3 * t * t * (1 - t) * cp1x + t * t * t * x1;
      context.fillStyle = BG_COLOR;
      context.fillRect(x1 - 10, y1 - 30, fx - (x1 - 10) + 0.4, 150);
      context.fillStyle = "#333";
      context.beginPath();
      context.arc(0, 0, 40, 0, Math.PI * 2);
      context.fill();
      context.translate(-27, -27);
      context.rotate(-45 / 57.3);
      context.fillRect(-15, -10, 30, 20);
      context.restore();
      if (lit) {
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.scale(viewScale, viewScale);
        const t2 = 1 - progress;
        let x02 = -33, y02 = -33;
        let cp0x2 = -80, cp0y2 = -80;
        let cp1x2 = -50, cp1y2 = 10;
        let x12 = -100, y12 = -25;
        let fx2 = Math.pow(1 - t2, 3) * x02 + 3 * t2 * Math.pow(1 - t2, 2) * cp0x2 + 3 * t2 * t2 * (1 - t2) * cp1x2 + t2 * t2 * t2 * x12;
        let fy = Math.pow(1 - t2, 3) * y02 + 3 * t2 * Math.pow(1 - t2, 2) * cp0y2 + 3 * t2 * t2 * (1 - t2) * cp1y2 + t2 * t2 * t2 * y12;
        context.translate(fx2, fy);
        context.lineWidth = 2;
        for (let i = 0; i < 20; i++) {
          const r = Math.random() * 50 + 200;
          const g = Math.min(r, Math.random() * 100 + 150);
          const b = Math.random() * 40 + 40;
          const rad = Math.random() * 20 + 5;
          const angle = Math.random() * 6.28;
          context.strokeStyle = `rgb(${r}, ${g}, ${b})`;
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(Math.cos(angle) * rad, Math.sin(angle) * rad);
          context.stroke();
        }
        context.restore();
      }
      if (respawnFrame) {
        context.restore();
      }
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.scale(viewScale, viewScale);
      const PULSE_COLOR = `rgba(80, 190, 250, ${Math.exp(-boomAnim * 2)})`;
      const R = (1 - Math.exp(-boomAnim * 3)) * 230;
      if (boom) {
        boomAnim += dT;
        context.strokeStyle = PULSE_COLOR;
        context.lineWidth = 8;
        context.beginPath();
        context.ellipse(0, -10 * boomAnim, R, R / 4, tilt1, Math.PI, 0);
        context.stroke();
        context.beginPath();
        context.ellipse(0, 10 * boomAnim, R * 0.6, R / 4 * 0.6, tilt2, Math.PI, 0);
        context.stroke();
      }
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(dT);
      }
      particles = particles.filter((p) => !p.isDone);
      if (boom) {
        context.strokeStyle = PULSE_COLOR;
        context.lineWidth = 8;
        context.beginPath();
        context.ellipse(0, -10 * boomAnim, R, R / 4, tilt1, 0, Math.PI);
        context.stroke();
        context.beginPath();
        context.ellipse(0, 10 * boomAnim, R * 0.6, R / 4 * 0.6, tilt2, 0, Math.PI);
        context.stroke();
      }
      context.restore();
    }
    return {
      start,
      update
    };
  };
  var game_engine_default = GameEngine;

  // client/scripts/main.js
  var engine = game_engine_default();
  var prevTime = 0;
  function gameloop(time) {
    const dT = Math.min((time - prevTime) / 1e3, 0.3);
    engine.update(dT);
    prevTime = time;
    window.requestAnimationFrame(gameloop);
  }
  controllerManager_default.initialize();
  network_default.initialize();
  engine.start();
  window.requestAnimationFrame(gameloop);
})();
