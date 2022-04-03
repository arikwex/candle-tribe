import { clear, context, canvas } from '../ui/screen.js';

const GameEngine = () => {
  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 600;

  function update(dT) {
    // Clear
    clear();
    context.fillStyle = '#ff8';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Render what's at stake
    renderBunnyScene();

    // Render mini-game area
    renderMinigame();
  }

  function renderBunnyScene() {
    context.fillStyle = '#ee7';
    context.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Bunny
    context.save();
    context.translate((canvas.width - GAME_WIDTH) / 2, canvas.height - 100);
    context.strokeStyle = '#000';
    context.lineWidth = 8;
    context.strokeRect(-50, -50, 100, 100);
    context.fillStyle = '#fff';
    context.fillRect(-50, -50, 100, 100);
    context.restore();

    // Anvil
    context.save();
    context.translate((canvas.width - GAME_WIDTH) / 2, 250);
    context.fillStyle = '#111';
    context.beginPath();
    context.moveTo(-30, -50);
    context.lineTo(100, -50);
    context.lineTo(100, -30);
    context.bezierCurveTo(70, -30, 40, -10, 30, 20);
    context.lineTo(60, 50);
    context.lineTo(30, 50);
    context.lineTo(10, 40);
    context.lineTo(-10, 40);
    context.lineTo(-30, 50);
    context.lineTo(-60, 50);
    context.lineTo(-20, 20);
    context.bezierCurveTo(-20, 0, -20, -10, -50, -10);
    context.lineTo(-100, -30);
    context.lineTo(-110, -40);
    context.lineTo(-35, -40);

    // Rope system
    context.fillStyle = '#111';


    context.closePath();
    context.fill();
    context.restore();
  }

  function renderMinigame() {
    context.fillStyle = '#333';
    context.fillRect(canvas.width - GAME_WIDTH, 0, GAME_WIDTH, canvas.height);
  }

  return {
    update,
  };
};

export default GameEngine;