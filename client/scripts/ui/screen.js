import bus from '../bus.js';

const canvas = document.getElementById('ui');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.imageSmoothingEnabled = false;

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

window.onresize =  () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  bus.emit('resize');
};

export {
  canvas,
  context,
  clear
};
