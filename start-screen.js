class StartScreen {
  constructor() {
    this.createStartScreen = this.createStartScreen.bind(this);
    this.startGame = this.startGame.bind(this);
    this.initCanvas = this.initCanvas.bind(this);
    this.animate = this.animate.bind(this);

    this.createStartScreen();
    this.initCanvas();
    this.frame = 0;
    this.animate();
  }

  createStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.className = 'start-screen';

    // Enhanced 3D Title
    const title = document.createElement('div');
    title.className = 'title-3d bounce';
    title.id = 'game-title';
    title.textContent = 'Verdugo';

    // Enhanced 3D CSS
    const style = document.createElement('style');
    style.innerHTML = `
      .title-3d {
        font-size: 3.5em;
        color: #fff;
        letter-spacing: 0.1em;
        font-family: 'Segoe UI Black', Impact, Arial, sans-serif;
        background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow:
          0 2px 0 #222,
          0 4px 0 #1a1a1a,
          0 8px 8px #3498db88,
          2px 4px 0 #222,
          0 0 32px #2ecc7188;
        transform: perspective(200px) rotateX(10deg) scale(1.08,1);
        margin-bottom: 20px;
        user-select: none;
      }
    `;
    document.head.appendChild(style);

    // Language dropdown
    const languageSelect = document.createElement('select');
    languageSelect.id = 'language-select';
    languageSelect.style.fontSize = '1.1em';
    languageSelect.style.marginBottom = '20px';
    languageSelect.innerHTML = `
      <option value="verdugo">Verdugo (Español)</option>
      <option value="hangman">Hangman (English)</option>
      <option value="mandarin">刽子手 (Mandarin)</option>
      <option value="french">Pendu (Français)</option>
      <option value="hindi">फांसी (Hindi)</option>
    `;

    // Update title on dropdown change
    const languageMap = {
      verdugo: 'Verdugo',
      hangman: 'Hangman',
      mandarin: '刽子手',
      french: 'Pendu',
      hindi: 'फांसी'
    };
    languageSelect.addEventListener('change', function () {
      title.textContent = languageMap[languageSelect.value];
    });

    // Canvas for 3D Cube
    const canvas = document.createElement('canvas');
    canvas.id = 'start-canvas';
    canvas.width = 400;
    canvas.height = 400;

    // Single Start Button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const startButton = document.createElement('button');
    startButton.className = 'start-button pulse';
    startButton.innerHTML = '▶️ Start Game';
    startButton.addEventListener('click', () => {
      // Redirect to game.html with language as query param
      window.location.href = `game.html?lang=${encodeURIComponent(languageSelect.value)}`;
    });

    buttonContainer.appendChild(startButton);

    // Add to start screen
    startScreen.appendChild(title);
    startScreen.appendChild(languageSelect);
    startScreen.appendChild(canvas);
    startScreen.appendChild(buttonContainer);

    document.body.appendChild(startScreen);
  }

  // 3D Spinning Cube Animation
  initCanvas() {
    this.canvas = document.getElementById('start-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.cubeSize = 90;
    this.cubeCenter = { x: 200, y: 200, z: 0 };
    this.cubeVertices = [
      [-1, -1, -1], [1, -1, -1],
      [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1],
      [1, 1, 1], [-1, 1, 1]
    ];
    this.cubeEdges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];
    this.cubeColors = [
      "#3498db", "#e74c3c", "#2ecc71", "#f1c40f",
      "#9b59b6", "#1abc9c", "#e67e22", "#34495e"
    ];
    this.angle = 0;
  }

  project([x, y, z]) {
    // Simple perspective projection
    const scale = 320 / (z + 4);
    return [
      this.cubeCenter.x + x * this.cubeSize * scale * 0.25,
      this.cubeCenter.y + y * this.cubeSize * scale * 0.25
    ];
  }

  animate() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, "#232526");
    gradient.addColorStop(1, "#3498db");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 3D Cube rotation
    this.angle += 0.015;
    const sinA = Math.sin(this.angle);
    const cosA = Math.cos(this.angle);
    const sinB = Math.sin(this.angle * 0.7);
    const cosB = Math.cos(this.angle * 0.7);

    // Rotate and project vertices
    const projected = this.cubeVertices.map(([x, y, z]) => {
      // Rotate around Y axis
      let dx = x * cosA - z * sinA;
      let dz = x * sinA + z * cosA;
      // Rotate around X axis
      let dy = y * cosB - dz * sinB;
      dz = y * sinB + dz * cosB;
      return this.project([dx, dy, dz]);
    });

    // Draw cube faces (filled polygons)
    const faces = [
      [0,1,2,3], // back
      [4,5,6,7], // front
      [0,1,5,4], // bottom
      [2,3,7,6], // top
      [1,2,6,5], // right
      [0,3,7,4]  // left
    ];
    faces.forEach((face, i) => {
      ctx.beginPath();
      ctx.moveTo(...projected[face[0]]);
      for (let j = 1; j < face.length; j++) {
        ctx.lineTo(...projected[face[j]]);
      }
      ctx.closePath();
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = this.cubeColors[i % this.cubeColors.length];
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Draw cube edges (for extra 3D pop)
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    this.cubeEdges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(...projected[a]);
      ctx.lineTo(...projected[b]);
      ctx.stroke();
    });

    // Draw a glowing shadow under the cube
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.ellipse(this.cubeCenter.x, this.cubeCenter.y + this.cubeSize + 30, this.cubeSize * 0.9, 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.shadowColor = "#3498db";
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.restore();

    this.frame++;
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new StartScreen();
});