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
      
      // Show submit button after all text is revealed
      setTimeout(() => {
        document.getElementById("submit-btn").classList.add("button-revealed");
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

// Submit button action
document
  .getElementById("submit-btn")
  .addEventListener("click", function () {
    // Add transition effect
    document.body.classList.add("submission-transition");
    
    // Show submission overlay
    const submissionOverlay = document.createElement("div");
    submissionOverlay.className = "loading-overlay";
    submissionOverlay.innerHTML = `
      <div class="loading-content">
        <h2>SUBMITTING SOLUTION</h2>
        <div class="loading-progress">
          <div class="loading-bar"></div>
        </div>
        <p class="loading-status">Validating code...</p>
      </div>
    `;
    document.body.appendChild(submissionOverlay);
    
    // Simulate submission progress
    let progress = 0;
    const loadingBar = submissionOverlay.querySelector(".loading-bar");
    const loadingStatus = submissionOverlay.querySelector(".loading-status");
    const statuses = [
      "Validating code...",
      "Checking monitoring functionality...",
      "Verifying original game mechanics...",
      "Testing log structure...",
      "Solution accepted!"
    ];
    
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      loadingBar.style.width = `${progress}%`;
      loadingStatus.textContent = statuses[Math.min(Math.floor(progress/25), 4)];
      
      if (progress === 100) {
        clearInterval(interval);
        
        // Show success message and then redirect to final page
        setTimeout(() => {
          submissionOverlay.querySelector(".loading-content").innerHTML = `
            <h2>MISSION COMPLETE</h2>
            <p>Excellent work, agent! Your implementation meets all requirements.</p>
            <p>All monitoring systems are now operational.</p>
            <p>Proceeding to mission completion...</p>
          `;
          
          // Redirect to completion page after showing success message
          setTimeout(() => {
            window.location.href = "mission-complete.html";
          }, 3000);
        }, 1500);
      }
    }, 300);
  });

// Console commands functionality
document.addEventListener("DOMContentLoaded", function() {
  const consoleInput = document.getElementById("console-input");
  const consoleLogs = document.getElementById("console-logs");
  
  // Collection of hacker-style system messages
  const hackingMessages = [
    "Monitoring target systems...",
    "Analyzing Phantom data structures...",
    "Scanning for security vulnerabilities...",
    "Encrypted connection stable...",
    "Capturing player activity patterns...",
    "Testing monitoring modules...",
    "Optimizing data collection algorithms...",
    "Bypassing detection countermeasures...",
    "Running stealth diagnostics...",
    "Encoding log files...",
    "Simulating player behaviors...",
    "Data analysis complete...",
    "Pattern recognition engaged",
    "Predictive model training in progress",
    "Hidden monitoring systems active",
    "Phantom database injection successful",
    "Automated log rotation initiated",
    "System resources optimized",
    "Validating encryption protocols...",
    "Anti-tampering measures deployed",
    "Memory footprint minimized",
    "Server response: 204 No Content",
    "Monitoring session initiated",
    "Obfuscation layer activated",
    "Zero-day vulnerability patched"
  ];
  
  // Function to add log to console
  function addConsoleLog(message, type = "") {
    const logElement = document.createElement("div");
    logElement.className = `console-log ${type}`;
    logElement.textContent = message;
    consoleLogs.appendChild(logElement);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
  }
  
  // Function to toggle code section visibility
  function toggleCodeSection(sectionId) {
    const section = document.getElementById(`${sectionId}-section`);
    if (!section) {
      addConsoleLog(`Error: Section "${sectionId}" not found.`, "error");
      return false;
    }
    
    if (section.classList.contains("visible")) {
      section.classList.remove("visible");
      addConsoleLog(`${sectionId.toUpperCase()} section hidden.`, "system");
      return false;
    } else {
      section.classList.add("visible");
      addConsoleLog(`${sectionId.toUpperCase()} section revealed.`, "success");
      // Scroll to the section
      section.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
  }
  
  // Display help information in the console
  function showHelp() {
    addConsoleLog("=== AVAILABLE COMMANDS ===", "system");
    addConsoleLog("/help - Show this help message", "system");
    addConsoleLog("/python - Toggle Python skeleton code", "system");
    addConsoleLog("/requirements - Toggle requirements section", "system");
    addConsoleLog("/data - Toggle example log structure", "system");
    addConsoleLog("/clear - Clear console logs", "system");
    addConsoleLog("/status - Show mission status", "system");
    addConsoleLog("/showall - Show all sections", "system");
    addConsoleLog("/hideall - Hide all sections", "system");
    addConsoleLog("/submit - Submit your solution", "system");
    addConsoleLog("/back - Return to Part 1", "system");
    addConsoleLog("========================", "system");
  }
  
  // Process console command
  function processCommand(command) {
    command = command.trim().toLowerCase();
    
    // Log the command
    addConsoleLog("> " + command);
    
    // Process based on command
    if (command === "/help") {
      showHelp();
    } else if (command === "/python") {
      toggleCodeSection("python");
    } else if (command === "/requirements") {
      toggleCodeSection("requirements");
    } else if (command === "/data") {
      toggleCodeSection("data");
    } else if (command === "/clear") {
      // Clear console logs except for the initial system message
      while (consoleLogs.children.length > 1) {
        consoleLogs.removeChild(consoleLogs.lastChild);
      }
      addConsoleLog("Console cleared.", "system");
    } else if (command === "/status") {
      addConsoleLog("=== MISSION STATUS ===", "success");
      addConsoleLog("Status: IN PROGRESS", "success");
      addConsoleLog("Objective: Implement modified game with monitoring", "system");
      addConsoleLog("Next step: Complete implementation and submit solution", "system");
      addConsoleLog("Security level: BETA", "system");
      addConsoleLog("=====================", "system");
    } else if (command === "/showall") {
      toggleCodeSection("python");
      toggleCodeSection("requirements");
      toggleCodeSection("data");
      addConsoleLog("All sections toggled.", "system");
    } else if (command === "/hideall") {
      document.querySelectorAll(".code-section.visible").forEach(section => {
        section.classList.remove("visible");
      });
      addConsoleLog("All sections hidden.", "system");
    } else if (command === "/submit") {
      addConsoleLog("Submitting solution...", "success");
      // Trigger submit button click
      setTimeout(() => {
        document.getElementById("submit-btn").click();
      }, 1000);
    } else if (command === "/back") {
      addConsoleLog("Returning to Part 1...", "system");
      setTimeout(() => {
        window.location.href = "part1.html";
      }, 1000);
    } else if (command.startsWith("/")) {
      addConsoleLog(`Unknown command: ${command}. Type /help for available commands.`, "error");
    } else {
      addConsoleLog(`Command execution failed: ${command}`, "error");
    }
  }
  
  // Console input event handler
  consoleInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const command = consoleInput.value;
      
      if (command.trim() !== "") {
        processCommand(command);
        consoleInput.value = "";
      }
    }
  });
  
  // Enhanced system message simulation
  function simulateSystemMessages() {
    // Only add new messages if there aren't too many already
    if (consoleLogs.children.length < 15) {
      const messageElement = document.createElement("div");
      messageElement.className = "console-log system";
      
      // Select a random message
      const message = hackingMessages[Math.floor(Math.random() * hackingMessages.length)];
      messageElement.textContent = message;
      
      // Randomly add numeric codes or status indicators
      if (Math.random() > 0.7) {
        const status = Math.random() > 0.5 ? "OK" : "PENDING";
        const code = Math.floor(Math.random() * 999);
        messageElement.textContent += ` [${status}:${code}]`;
      }
      
      consoleLogs.appendChild(messageElement);
      consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }
    
    // Schedule next message at random interval
    setTimeout(simulateSystemMessages, Math.random() * 4000 + 2000);
  }
  
  // Initialize console
  addConsoleLog("Terminal v2.7.4 initialized", "system");
  addConsoleLog("Connected to secure server: OP-PHANTOM", "system");
  addConsoleLog("Mission phase: PART 2 - Implementation", "system");
  addConsoleLog("Type /help for available commands", "system");
  
  // Start system message simulation
  setTimeout(simulateSystemMessages, 2000);
  
  // Make sure all code sections start hidden
  document.querySelectorAll(".code-section").forEach(section => {
    section.classList.remove("visible");
  });

  // Add command listener for secure environment link
  document.querySelector('.env-link').addEventListener('click', function(e) {
    e.preventDefault();
    addConsoleLog("Opening secure Python environment...", "system");
    // You could redirect to a specific URL here if needed
    window.open("secure-python-environment.html", "_blank");
  });
});

// Additional CSS injection for console height and layout changes
document.addEventListener("DOMContentLoaded", function() {
  // Create style element
  const style = document.createElement('style');
  
  // Add custom styles to fix console layout
  style.textContent = `
    .command-console {
      height: 300px !important;
    }
    
    .console-input-area {
      width: 50% !important;
      align-items: flex-start !important;
    }
    
    .console-logs {
      width: 50% !important;
      max-height: 300px !important;
    }
    
    .mission-page {
      padding-bottom: 320px !important;
    }
  `;
  
  // Append style to head
  document.head.appendChild(style);
});