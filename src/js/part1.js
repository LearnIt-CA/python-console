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

// Copy code functionality
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const codeBlock = document.getElementById(targetId);
    const textToCopy = codeBlock.textContent;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Show copied notification
      this.textContent = "COPIED!";
      this.classList.add("copied");
      
      // Animation effect on code block
      codeBlock.classList.add("flash");
      setTimeout(() => {
        codeBlock.classList.remove("flash");
      }, 300);
      
      // Reset button after 2 seconds
      setTimeout(() => {
        this.textContent = "COPY CODE";
        this.classList.remove("copied");
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      this.textContent = "ERROR";
      this.classList.add("error");
      
      setTimeout(() => {
        this.textContent = "COPY CODE";
        this.classList.remove("error");
      }, 2000);
    });
  });
});

// Terminal typing effect for mission text
function initTerminalEffect() {
  const terminalTexts = document.querySelectorAll(".terminal-text");
  const taskItems = document.querySelectorAll(".task-list li");
  
  // Hide all text initially
  [...terminalTexts, ...taskItems].forEach(el => {
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
  
  // Start revealing terminal text
  setTimeout(() => {
    revealElements(terminalTexts, 400);
    
    // Start revealing task items after terminal text
    setTimeout(() => {
      revealElements(taskItems, 300);
      
      // Show next part button after all text is revealed
      setTimeout(() => {
        document.getElementById("next-part-btn").classList.add("button-revealed");
      }, taskItems.length * 300 + 500);
    }, terminalTexts.length * 400 + 500);
  }, 800);
}

// Initialize the terminal effect
document.addEventListener("DOMContentLoaded", initTerminalEffect);

// Add blinking cursor to last terminal text
function addBlinkingCursor() {
  const lastTerminalText = document.querySelector(".terminal-text:last-of-type");
  if (lastTerminalText) {
    lastTerminalText.classList.add("cursor");
  }
}

// Call blinking cursor
setTimeout(addBlinkingCursor, 3000);

// Simulate random system messages in the background
function simulateSystemMessages() {
  const messages = [
    "Scanning network traffic...",
    "Monitoring Phantom communications...",
    "Analyzing encryption patterns...",
    "Secure connection maintained...",
    "Intercepting data packets...",
    "Checking for intrusions...",
    "Updating security protocols..."
  ];
  
  // Create system message container if it doesn't exist
  let systemLogs = document.querySelector(".system-logs");
  if (!systemLogs) {
    systemLogs = document.createElement("div");
    systemLogs.className = "system-logs";
    document.body.appendChild(systemLogs);
  }
  
  // Add a new message
  const messageElement = document.createElement("div");
  messageElement.className = "system-log";
  messageElement.textContent = messages[Math.floor(Math.random() * messages.length)];
  systemLogs.appendChild(messageElement);
  
  // Remove old messages if too many
  if (systemLogs.children.length > 5) {
    systemLogs.removeChild(systemLogs.children[0]);
  }
  
  // Schedule next message
  setTimeout(simulateSystemMessages, Math.random() * 5000 + 2000);
}

// Start system messages
setTimeout(simulateSystemMessages, 3000);

// Next part button action
document
  .getElementById("next-part-btn")
  .addEventListener("click", function () {
    // Add transition effect
    document.body.classList.add("mission-transition");
    
    // Show loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "loading-overlay";
    loadingOverlay.innerHTML = `
      <div class="loading-content">
        <h2>LOADING PART 2</h2>
        <div class="loading-progress">
          <div class="loading-bar"></div>
        </div>
        <p class="loading-status">Processing code analysis...</p>
      </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Simulate loading progress
    let progress = 0;
    const loadingBar = loadingOverlay.querySelector(".loading-bar");
    const loadingStatus = loadingOverlay.querySelector(".loading-status");
    const statuses = [
      "Processing code analysis...",
      "Preparing development environment...",
      "Securing communication channels...",
      "Initializing mission parameters...",
      "Ready to proceed!"
    ];
    
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      loadingBar.style.width = `${progress}%`;
      loadingStatus.textContent = statuses[Math.min(Math.floor(progress/25), 4)];
      
      if (progress === 100) {
        clearInterval(interval);
        
        // Redirect to part 2 after short delay
        setTimeout(() => {
          window.location.href = "part2.html";
        }, 1500);
      }
    }, 300);
  });