// --- PARTICLE BACKGROUND SCRIPT ---
const canvas = document.getElementById("particleCanvas"); // Changed from 'chessCanvas' to match HTML
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const icons = ["♔", "♕", "♖", "♘", "♙"];

class Particle {
  constructor(x, y, char) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.size = 22;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
  }
  draw() {
    ctx.fillStyle = "#fff";
    ctx.font = `${this.size}px Arial`;
    ctx.fillText(this.char, this.x, this.y);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

    this.draw();
  }
}

function init() {
  for (let i = 0; i < 50; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let char = icons[Math.floor(Math.random() * icons.length)];
    particles.push(new Particle(x, y, char));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animate);
}

init();
animate();

// Mouse repel effect
canvas.addEventListener("mousemove", e => {
  particles.forEach(p => {
    let dx = p.x - e.clientX;
    let dy = p.y - e.clientY;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      p.x += dx / dist * 2;
      p.y += dy / dist * 2;
    }
  });
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


// --- NEW BACKGROUND MUSIC SCRIPT ---
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const toggleBtn = document.getElementById('music-toggle-btn');
    let hasInteracted = false;

    // Function to update the button's visual state
    function updateButtonState() {
        if (music.paused) {
            toggleBtn.classList.remove('playing');
        } else {
            toggleBtn.classList.add('playing');
        }
    }

    // Attempt to play music and handle browser autoplay restrictions
    async function playMusic() {
        try {
            await music.play();
            updateButtonState();
        } catch (err) {
            // Autoplay was blocked. We'll wait for user interaction.
            console.log('Autoplay was prevented by the browser.');
        }
    }

    // Toggle play/pause when the button is clicked
    toggleBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
        updateButtonState();
    });

    // A one-time event listener to start music after the first user interaction
    const startOnInteraction = () => {
        if (!hasInteracted) {
            hasInteracted = true;
            playMusic();
            // Remove this listener after it has run once
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('scroll', startOnInteraction);
            document.removeEventListener('keydown', startOnInteraction);
        }
    };
    
    document.addEventListener('click', startOnInteraction);
    document.addEventListener('scroll', startOnInteraction);
    document.addEventListener('keydown', startOnInteraction);

    // Initial state
    updateButtonState();
});

// --- JavaScript to Hide Navbar on Scroll ---

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const scrollContainer = document.querySelector('.scroll-container');

    if (navbar && scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            // If the user has scrolled more than 100 pixels down
            if (scrollContainer.scrollTop > 100) {
                // Add the hidden class to slide it away
                navbar.classList.add('navbar-hidden');
            } else {
                // Otherwise, remove the class to show it
                navbar.classList.remove('navbar-hidden');
            }
        });
    }
});

