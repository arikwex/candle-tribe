import bus from '../bus.js';

function buildInterface() {
  // BOTTOM
  const menu = document.createElement('div');
  menu.id = 'menu';
  document.body.appendChild(menu);

  const igniteButton = document.createElement('button');
  igniteButton.innerText = '🔥 Ignite';
  menu.appendChild(igniteButton);

  const extinguishButton = document.createElement('button');
  extinguishButton.innerText = '🧯 Extinguish';
  menu.appendChild(extinguishButton);

  igniteButton.onclick = function() { bus.emit('ignite'); }
  extinguishButton.onclick = function() { bus.emit('extinguish'); }
}

function setVisitorNumber(num) {
  let txt = '' + num;
  while (txt.length < 5) {
    txt = '0' + txt;
  }
  const dom = document.getElementsByClassName('visitor-number')[0];
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

  let strHr = '' + parseInt(hr);
  if (strHr.length < 2) { strHr = '0' + strHr; }
  let strMin = '' + parseInt(min);
  if (strMin.length < 2) { strMin = '0' + strMin; }
  let strSec = '' + parseInt(sec);
  if (strSec.length < 2) { strSec = '0' + strSec; }

  let txt = strHr + ':' + strMin + ':' + strSec;

  const dom = document.getElementsByClassName('incident-counter')[0];
  if (dom) {
    dom.innerText = txt;
  }
}

function setExplosions(num) {
  const dom = document.getElementsByClassName('num-explosions')[0];
  if (dom) {
    dom.innerText = num;
  }
}

function setWickLength(inches) {
  const dom = document.getElementsByClassName('wick-length')[0];
  if (dom) {
    dom.innerText = `${(inches / 12.0).toFixed(2)} ft`;
  }
}

function setActiveVisitors(num) {
  const dom = document.getElementsByClassName('active-visitors')[0];
  if (dom) {
    dom.innerText = num;
  }
}

export default {
  buildInterface,
  setVisitorNumber,
  setTimeSinceLastExplosion,
  setExplosions,
  setWickLength,
  setActiveVisitors,
};