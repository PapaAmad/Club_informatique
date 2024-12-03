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

// Vision navigation functionality
const visionCards = document.querySelectorAll('.vision-card');
const visionDots = document.querySelectorAll('.vision-dot');
const prevButton = document.querySelector('.vision-arrow.prev');
const nextButton = document.querySelector('.vision-arrow.next');
const visionTitle = document.querySelector('.current-vision-title');

const visions = [
  { title: 'Interactions et Vulgarisation (1/2)', id: 'Interactions et Vulgarisation (1/2)' },
  { title: 'Interactions et Vulgarisation (2/2)', id: 'Interactions et Vulgarisation (2/2)' },
  { title: 'Collaboration et Partenariats (1/2)', id: 'Collaboration et Partenariats (1/2)' },
  { title: 'Collaboration et Partenariats (2/2)', id: 'Collaboration et Partenariats (2/2)' },
  { title: 'Développement et Apprentissage (1/2)', id: 'Développement et Apprentissage (1/2)' },
  { title: 'Développement et Apprentissage (2/2)', id: 'Développement et Apprentissage (2/2)' },
  { title: 'Activités Pratiques et Divertissement (1/2)', id: 'Activités Pratiques et Divertissement (1/2)' },
  { title: 'Activités Pratiques et Divertissement (2/2)', id: 'Activités Pratiques et Divertissement (2/2)' }
];

let currentVisionIndex = 0;
let autoSlideInterval;

function updateVision(newIndex) {
  if (newIndex < 0) newIndex = visions.length - 1;
  if (newIndex >= visions.length) newIndex = 0;
  
  const direction = newIndex > currentVisionIndex ? 1 : -1;
  currentVisionIndex = newIndex;
  
  // Update dots
  visionDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentVisionIndex);
  });
  
  // Smoother card transitions
  visionCards.forEach(card => {
    if (card.dataset.vision === visions[currentVisionIndex].id) {
      card.style.display = 'block';
      card.style.transform = `translateX(${direction * 100}%)`;
      card.style.opacity = '0';
      
      requestAnimationFrame(() => {
        card.style.transform = 'translateX(0)';
        card.style.opacity = '1';
        card.classList.add('active');
      });
    } else {
      card.style.transform = `translateX(${-direction * 100}%)`;
      card.style.opacity = '0';
      card.classList.remove('active');
      setTimeout(() => {
        if (!card.classList.contains('active')) {
          card.style.display = 'none';
        }
      }, 800);
    }
  });

  // Smoother title transition
  visionTitle.style.opacity = '0';
  visionTitle.style.transform = `translateX(${direction * 50}px)`;
  
  setTimeout(() => {
    visionTitle.textContent = visions[currentVisionIndex].title;
    requestAnimationFrame(() => {
      visionTitle.style.opacity = '1';
      visionTitle.style.transform = 'translateX(0)';
    });
  }, 300);
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(() => {
    updateVision(currentVisionIndex + 1);
  }, 10000); // Change every 10 seconds
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
}

// Event listeners
prevButton.addEventListener('click', () => {
  updateVision(currentVisionIndex - 1);
  startAutoSlide(); // Reset timer on manual navigation
});

nextButton.addEventListener('click', () => {
  updateVision(currentVisionIndex + 1);
  startAutoSlide(); // Reset timer on manual navigation
});

visionDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    updateVision(index);
    startAutoSlide(); // Reset timer on manual navigation
  });
});

// Add hover pause functionality to the vision section
document.querySelector('.vision-section').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.vision-section').addEventListener('mouseleave', startAutoSlide);

// Initialize first vision and start auto-sliding
updateVision(0);
startAutoSlide();