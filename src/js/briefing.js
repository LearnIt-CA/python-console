// Matrix rain effect
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Characters for matrix rain
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()!?><|\\/[]{}";

// Font settings
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

// Initialize drops at random positions
const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
}

// Matrix rain function
function drawMatrixRain() {
  // Semi-transparent black background for trail effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Green text
  ctx.fillStyle = "#0f8";
  ctx.font = `${fontSize}px monospace`;

  // Draw drops
  for (let i = 0; i < drops.length; i++) {
    // Random character
    const text = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );

    // Draw character
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    // Reset drop if it's below canvas or randomly
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    // Move drop
    drops[i]++;
  }
}

// Start matrix rain animation
setInterval(drawMatrixRain, 50);

// Remove intro animation - document is already loaded and mission page is displayed

// Add targeting lines
function createTargetingLines() {
  const body = document.body;
  
  // Create horizontal targeting line
  const hLine = document.createElement("div");
  hLine.className = "targeting-line targeting-line-h";
  body.appendChild(hLine);
  
  // Create vertical targeting line
  const vLine = document.createElement("div");
  vLine.className = "targeting-line targeting-line-v";
  body.appendChild(vLine);
}

// Call targeting lines function
createTargetingLines();

// Setup the target info click handler
function setupTargetInfoClickHandler() {
  const targetInfo = document.getElementById("target-info");
  
  if (targetInfo) {
    targetInfo.addEventListener("click", function() {
      // Get the glitch overlay
      const glitchOverlay = targetInfo.querySelector(".glitch-overlay");
      
      // Show the glitch overlay
      glitchOverlay.style.display = "flex";
      
      // Hide it after a short period
      setTimeout(() => {
        glitchOverlay.style.display = "none";
      }, 1200);
    });
  }
}

// Call target info click handler
setupTargetInfoClickHandler();

// Add status blinking effect
function addStatusBlinking() {
  const statusElement = document.querySelector(".status-line span:last-child");
  if (statusElement) {
    setInterval(() => {
      statusElement.classList.toggle("blink");
    }, 1000);
  }
}

// Call status blinking
addStatusBlinking();

// Begin mission button action with direct navigation
document.addEventListener('DOMContentLoaded', function() {
  const beginMissionBtn = document.getElementById("begin-mission-btn");
  if (beginMissionBtn) {
    // Retrieve the agent's name from localStorage
    const agentName = localStorage.getItem('agentName') || 'AGENT';
    
    // Update button text to include agent name
    beginMissionBtn.textContent = `BEGIN MISSION, AGENT ${agentName.toUpperCase()}`;
    
    beginMissionBtn.addEventListener("click", function () {
      // Direct navigation to training.html without loading screen
      window.location.href = 'training.html';
    });
  }
});