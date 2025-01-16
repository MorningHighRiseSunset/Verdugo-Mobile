class StartScreen {
  constructor() {
    this.createStartScreen = this.createStartScreen.bind(this);
    this.startGame = this.startGame.bind(this);
    this.initCanvas = this.initCanvas.bind(this);
    this.animate = this.animate.bind(this);
    this.updatePhysics = this.updatePhysics.bind(this);
    this.constrainRope = this.constrainRope.bind(this);
    this.drawCharacter = this.drawCharacter.bind(this);
    this.drawRope = this.drawRope.bind(this);
    this.drawGallows = this.drawGallows.bind(this);
    
    this.createStartScreen();
    this.initCanvas();
    this.frame = 0;
    this.animate();
  }

  createStartScreen() {
    const startScreen = document.createElement('div');
    startScreen.className = 'start-screen';
    
    const title = document.createElement('h1');
    title.className = 'title-3d bounce';
    title.textContent = 'VERDUGO';
    
    const canvas = document.createElement('canvas');
    canvas.id = 'start-canvas';
    canvas.width = 400;
    canvas.height = 400;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const startButtonEnglish = document.createElement('button');
    startButtonEnglish.className = 'start-button pulse';
    startButtonEnglish.innerHTML = '🇺🇸 Play in English';
    startButtonEnglish.addEventListener('click', () => this.startGame('en'));

    const startButtonSpanish = document.createElement('button');
    startButtonSpanish.className = 'start-button pulse';
    startButtonSpanish.innerHTML = '🇪🇸 Jugar en Español';
    startButtonSpanish.addEventListener('click', () => this.startGame('es'));
    
    buttonContainer.appendChild(startButtonEnglish);
    buttonContainer.appendChild(startButtonSpanish);
    
    startScreen.appendChild(title);
    startScreen.appendChild(canvas);
    startScreen.appendChild(buttonContainer);
    
    document.body.appendChild(startScreen);
}

  initCanvas() {
    this.canvas = document.getElementById('start-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.character = {
      x: 200,
      y: 200,
      radius: 22,
      swingAngle: 0,
      swingSpeed: 0.012,
      armAngle: 0,
      legAngle: 0,
      isStruggling: true,
      struggleIntensity: 0.7
    };
    
    this.rope = {
      startX: 200,
      startY: 50,
      segments: 10,
      points: [],
      constraints: []
    };

    for (let i = 0; i <= this.rope.segments; i++) {
      this.rope.points.push({
        x: this.rope.startX,
        y: this.rope.startY + (i * 15),
        oldX: this.rope.startX,
        oldY: this.rope.startY + (i * 15)
      });
    }
  }

  updatePhysics() {
    this.character.swingAngle += this.character.swingSpeed;
    const swingRadius = 40;
    this.character.x = 200 + Math.sin(this.character.swingAngle) * swingRadius;
    this.character.y = 150 + Math.abs(Math.cos(this.character.swingAngle)) * 20;

    this.character.armAngle = Math.sin(this.frame * 0.1) * 0.5 * this.character.struggleIntensity;
    this.character.legAngle = Math.sin(this.frame * 0.1 + Math.PI) * 0.3 * this.character.struggleIntensity;

    const points = this.rope.points;
    const gravity = 0.5;
    const friction = 0.97;

    for (let i = 0; i < points.length; i++) {
      if (i === 0) continue;
      
      const point = points[i];
      const vx = (point.x - point.oldX) * friction;
      const vy = (point.y - point.oldY) * friction + gravity;
      
      point.oldX = point.x;
      point.oldY = point.y;
      point.x += vx;
      point.y += vy;
    }

    for (let i = 0; i < 5; i++) {
      this.constrainRope();
    }

    const lastPoint = points[points.length - 1];
    lastPoint.x = this.character.x;
    lastPoint.y = this.character.y - this.character.radius;
  }

  constrainRope() {
    const points = this.rope.points;
    const segmentLength = 15;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const difference = segmentLength - distance;
      const percent = difference / distance / 2;
      const offsetX = dx * percent;
      const offsetY = dy * percent;

      if (i === 0) {
        p2.x += offsetX * 2;
        p2.y += offsetY * 2;
      } else {
        p1.x -= offsetX;
        p1.y -= offsetY;
        p2.x += offsetX;
        p2.y += offsetY;
      }
    }
  }

  drawCharacter() {
    const ctx = this.ctx;
    const char = this.character;
  
    const tugAngle = Math.sin(this.frame * 0.1) * 0.2;
    const tugOffsetX = Math.sin(tugAngle) * 5;
    const tugOffsetY = Math.cos(tugAngle) * 2;
  
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.moveTo(char.x - 12, char.y + char.radius + 5);
    ctx.quadraticCurveTo(
      char.x, char.y + char.radius + 25,
      char.x + 12, char.y + char.radius + 5
    );
    ctx.lineTo(char.x + 10, char.y + char.radius + 40);
    ctx.lineTo(char.x - 10, char.y + char.radius + 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  
    ctx.beginPath();
    ctx.save();
    ctx.translate(char.x, char.y);
    ctx.rotate(tugAngle);
    ctx.scale(1, 1.2);
    ctx.arc(0, 0, char.radius, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();
    ctx.stroke();
  
    const faceX = char.x + tugOffsetX;
    const faceY = char.y + tugOffsetY;
    
    ctx.beginPath();
    ctx.arc(faceX - 5, faceY - 2, 2, 0, Math.PI * 2);
    ctx.arc(faceX + 5, faceY - 2, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(faceX, faceY + 5, 3, 0, Math.PI, true);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(faceX - 5, faceY + char.radius - 2);
    ctx.lineTo(faceX + 5, faceY + char.radius - 2);
    ctx.stroke();
  
    ctx.fillStyle = '#7c5c3c';
    const handSize = 6;
    
    ctx.beginPath();
    ctx.save();
    ctx.translate(faceX - 8 + tugOffsetX, faceY + char.radius - 2 + tugOffsetY);
    ctx.rotate(tugAngle - 0.5);
    ctx.ellipse(0, 0, handSize, handSize/2, 0, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();
    ctx.stroke();
  
    ctx.beginPath();
    ctx.save();
    ctx.translate(faceX + 8 + tugOffsetX, faceY + char.radius - 2 + tugOffsetY);
    ctx.rotate(-tugAngle + 0.5);
    ctx.ellipse(0, 0, handSize, handSize/2, 0, 0, Math.PI * 2);
    ctx.restore();
    ctx.fill();
    ctx.stroke();
  
    const shoulderY = char.y + char.radius + 15;
    
    ctx.beginPath();
    ctx.moveTo(char.x - 12, shoulderY);
    ctx.quadraticCurveTo(
      char.x - 15, char.y + char.radius + 5,
      faceX - 8 + tugOffsetX, faceY + char.radius - 2 + tugOffsetY
    );
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(char.x + 12, shoulderY);
    ctx.quadraticCurveTo(
      char.x + 15, char.y + char.radius + 5,
      faceX + 8 + tugOffsetX, faceY + char.radius - 2 + tugOffsetY
    );
    ctx.stroke();
  
    const hipY = char.y + char.radius + 40;
    const legAngle = Math.sin(this.frame * 0.1) * 0.2;
  
    ctx.beginPath();
    ctx.moveTo(char.x - 8, hipY);
    ctx.quadraticCurveTo(
      char.x - 10 + Math.sin(legAngle) * 5, hipY + 20,
      char.x - 5 + Math.sin(legAngle) * 10, hipY + 40
    );
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(char.x + 8, hipY);
    ctx.quadraticCurveTo(
      char.x + 10 + Math.sin(-legAngle) * 5, hipY + 20,
      char.x + 5 + Math.sin(-legAngle) * 10, hipY + 40
    );
    ctx.stroke();
  
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(char.x - 8, char.y + char.radius + 5);
    ctx.lineTo(char.x - 5, char.y + char.radius + 10);
    ctx.lineTo(char.x + 5, char.y + char.radius + 10);
    ctx.lineTo(char.x + 8, char.y + char.radius + 5);
    ctx.stroke();
  
    ctx.beginPath();
    ctx.moveTo(char.x - 10, char.y + char.radius + 20);
    ctx.lineTo(char.x + 10, char.y + char.radius + 20);
    ctx.moveTo(char.x - 9, char.y + char.radius + 30);
    ctx.lineTo(char.x + 9, char.y + char.radius + 30);
    ctx.stroke();
  }

  drawRope() {
    const ctx = this.ctx;
    const points = this.rope.points;

    ctx.strokeStyle = '#916835';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }

  drawGallows() {
    const ctx = this.ctx;
    
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 8;
    
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(350, 350);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(98, 50);
    ctx.lineTo(200, 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 80);
    ctx.lineTo(140, 50);
    ctx.stroke();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#2c3e50');
    gradient.addColorStop(1, '#3498db');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawGallows();
    this.updatePhysics();
    this.drawRope();
    this.drawCharacter();

    this.frame++;
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  startGame(language) {
    const startScreen = document.querySelector('.start-screen');
    startScreen.style.animation = 'fadeOut 1s forwards';
    
    const selectedLanguage = language || 'en';
    
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage === 'es' ? 'es-ES' : 'en-US';
    }
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
      gameContainer.style.display = 'block';
      
      document.dispatchEvent(new CustomEvent('gameStart', { 
        detail: { 
          mode: selectedLanguage === 'es' ? 'Verdugo' : 'Hangman',
          language: selectedLanguage === 'es' ? 'es-ES' : 'en-US' 
        }
      }));
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    setTimeout(() => {
      startScreen.remove();
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new StartScreen();
});
