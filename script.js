const canvas = document.querySelector('.floating-particles');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = `rgba(65, 105, 225, ${Math.random() * 0.5})`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > height || this.y < 0) this.speedY = -this.speedY;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = Array(50).fill().map(() => new Particle());

function animate() {
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animate);
}

animate();

document.querySelector('.nav-button').addEventListener('click', () => {
  document.querySelector('.candidate-section').scrollIntoView({
    behavior: 'smooth'
  });
});

document.querySelectorAll('.team-member').forEach(member => {
  member.addEventListener('mouseenter', () => {
    member.style.transform = 'translateY(-10px) scale(1.05)';
  });
  
  member.addEventListener('mouseleave', () => {
    member.style.transform = 'translateY(0) scale(1)';
  });
});

// Adding hover effects for vision cards
document.querySelectorAll('.vision-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.background = 'rgba(255, 255, 255, 0.1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.background = 'rgba(255, 255, 255, 0.05)';
  });
});