// JavaScript for snow animation
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array to store individual snowflakes
const snowflakes = [];

// Function to create snowflakes
function createSnowflakes() {
  for (let i = 0; i < 80; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1, // Random radius between 1 and 4
      speed: Math.random() * 3 + 0.25, // Random speed between 1 and 4
      opacity:  Math.random() * 0.8 + 0.2 // Random opacity between 0.5 and 1
    });
  }
}

// Function to draw snowflakes
function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';

  snowflakes.forEach(flake => {
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.globalAlpha = flake.opacity;
    ctx.fill();
    flake.y += flake.speed;

    // Reset snowflake position if it goes out of the screen
    if (flake.y > canvas.height) {
      flake.x = Math.random() * canvas.width;
      flake.y = -5;
    }
  });

  requestAnimationFrame(drawSnowflakes);
}

// Create snowflakes and start animation
createSnowflakes();
drawSnowflakes();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
