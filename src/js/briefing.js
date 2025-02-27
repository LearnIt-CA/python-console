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

// Create binary overlay
function createBinaryOverlay() {
  const overlay = document.getElementById("binary-overlay");

  for (let i = 0; i < 50; i++) {
    const binaryText = document.createElement("div");
    binaryText.className = "binary-text";

    // Random binary string
    let text = "";
    const length = Math.floor(Math.random() * 20) + 10;

    for (let j = 0; j < length; j++) {
      text += Math.floor(Math.random() * 2);
    }

    binaryText.textContent = text;

    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    binaryText.style.left = `${left}%`;
    binaryText.style.top = `${top}%`;

    overlay.appendChild(binaryText);
  }
}

// Call binary overlay function
createBinaryOverlay();

// Add targeting lines (like in index page)
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

// Terminal typing effect for mission briefing
function initTerminalEffect() {
  const missionText = document.querySelectorAll(".mission-text");
  const objectiveItems = document.querySelectorAll(".objective-item");
  
  // Hide all text initially
  [...missionText, ...objectiveItems].forEach(el => {
    el.style.opacity = "0";
    el.style.display = "block";
  });
  
  // Function to reveal text elements with typing effect
  function revealElements(elements, delay = 100) {
    let index = 0;
    
    function revealNext() {
      if (index < elements.length) {
        elements[index].style.opacity = "1";
        elements[index].classList.add("typed");
        index++;
        setTimeout(revealNext, delay);
      }
    }
    
    revealNext();
  }
  
  // Start revealing mission text after a short delay
  setTimeout(() => {
    revealElements(missionText, 600);
    
    // Start revealing objective items after mission text
    setTimeout(() => {
      revealElements(objectiveItems, 400);
      
      // Show begin mission button after all text is revealed
      setTimeout(() => {
        document.getElementById("begin-mission-btn").classList.add("button-revealed");
      }, objectiveItems.length * 400 + 500);
    }, missionText.length * 600 + 500);
  }, 1000);
}

// Initialize the terminal effect
document.addEventListener("DOMContentLoaded", initTerminalEffect);

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

// Begin mission button action with improved transition
document
  .getElementById("begin-mission-btn")
  .addEventListener("click", function () {
    // Add transition effect
    document.body.classList.add("mission-transition");
    
    // Show loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "loading-overlay";
    loadingOverlay.innerHTML = `
      <div class="loading-content">
        <h2>INITIALIZING MISSION</h2>
        <div class="loading-progress">
          <div class="loading-bar"></div>
        </div>
        <p class="loading-status">Loading mission parameters...</p>
      </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Simulate loading progress
    let progress = 0;
    const loadingBar = loadingOverlay.querySelector(".loading-bar");
    const loadingStatus = loadingOverlay.querySelector(".loading-status");
    const statuses = [
      "Loading mission parameters...",
      "Accessing secure servers...",
      "Decrypting game data...",
      "Establishing secure connection...",
      "Mission ready!"
    ];
    
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      loadingBar.style.width = `${progress}%`;
      loadingStatus.textContent = statuses[Math.min(Math.floor(progress/25), 4)];
      
      if (progress === 100) {
        clearInterval(interval);
        
        // Redirect to part1.html page after short delay
        setTimeout(() => {
          window.location.href = 'training.html';
        }, 1500);
      }
    }, 300);
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the agent's name from localStorage
    const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
    
    // Use the agent's name in the briefing page
    const agentNameElements = document.querySelectorAll('.agent-name');
    agentNameElements.forEach(element => {
      element.textContent = agentName.toUpperCase();
    });
    
    // Example of personalizing briefing content
    const briefingHeader = document.querySelector('.mission-subtitle');
    if (briefingHeader) {
      briefingHeader.textContent = `Mission Briefing for Agent ${agentName.toUpperCase()}`;
    }
    
    // If you need to check if user is authenticated
    if (!localStorage.getItem('agentName')) {
      // Redirect unauthorized users back to login
      //window.location.href = 'index.html';
    }
  });