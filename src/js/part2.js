// Intro animation sequence - added from index.js
document.addEventListener('DOMContentLoaded', function() {
  const introMessages = [
    "Impressive, I didn't expect you to finish in such a short time",
    "Now we're at the final step",
    "Getting closer and closer to the truth",
    "Keep going, I believe in you",
  ];

  // DOM elements
  const introAnimation = document.getElementById('intro-animation');
  const terminalContent = document.getElementById('terminal-content');
  const terminalContainer = document.querySelector('.terminal-container');
  
  // Add computational overlay for effects
  const compOverlay = document.createElement('div');
  compOverlay.className = 'computational-overlay';
  terminalContainer.appendChild(compOverlay);
  
  // Clear any existing content
  terminalContent.innerHTML = '';
  
  let currentMessageIndex = 0;
  let isComplete = false;
  
  // Function to create a typing effect for a message with slower speed
  function typeMessage(message, index) {
    return new Promise(resolve => {
      // Create a new line element
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.style.animation = 'none'; // Disable default animation
      line.style.opacity = '1';
      
      // For empty messages (spacing), resolve immediately
      if (message === "") {
        line.innerHTML = "&nbsp;";
        terminalContent.appendChild(line);
        resolve();
        return;
      }
      
      // Add the typing span
      const typingSpan = document.createElement('span');
      typingSpan.className = 'typing';
      typingSpan.textContent = message;
      line.appendChild(typingSpan);
      
      // Add line to terminal
      terminalContent.appendChild(line);
      
      // Slower typing speed - increased duration
      const typingDuration = Math.min(message.length * 50, 2000);
      
      // Set the animation duration dynamically
      typingSpan.style.animationDuration = `${typingDuration}ms`;
      
      // Auto-scroll to bottom
      setTimeout(() => {
        terminalContent.scrollTop = terminalContent.scrollHeight;
      }, 50);
      
      // Resolve after animation completes
      setTimeout(resolve, typingDuration + 400);
    });
  }
  
  // Function to handle enter key press for skipping or continuing
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (isComplete) {
        createGridTransition();
      }
    }
  }
  
  // Add event listener for key press
  document.addEventListener('keydown', handleKeyPress);
  
  // Create grid transition effect
  function createGridTransition() {
    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeyPress);
    
    // First apply a glitch effect to the terminal
    terminalContainer.classList.add('terminal-glitch');
    
    setTimeout(() => {
      // Get the actual position and dimensions of the terminal container
      const terminalRect = terminalContainer.getBoundingClientRect();
      const gridSize = 10; // More grid items for a more detailed effect
      const width = terminalRect.width;
      const height = terminalRect.height;
      const itemWidth = width / gridSize;
      const itemHeight = height / gridSize;
      
      // Clone the terminal content for the grid effect
      const terminalClone = terminalContent.cloneNode(true);
      
      // Hide original terminal content
      terminalContent.style.visibility = 'hidden';
      document.querySelector('.cursor-line').style.visibility = 'hidden';
      
      // Create grid items
      const gridItems = [];
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const item = document.createElement('div');
          item.className = 'grid-item';
          item.style.width = `${itemWidth}px`;
          item.style.height = `${itemHeight}px`;
          
          // Use absolute positioning relative to the terminal container
          item.style.position = 'absolute';
          item.style.left = `${j * itemWidth}px`;
          item.style.top = `${i * itemHeight}px`;
          item.style.borderLeft = i % 2 === 0 ? '1px solid rgba(0, 255, 65, 0.3)' : 'none';
          item.style.borderTop = j % 2 === 0 ? '1px solid rgba(0, 255, 65, 0.3)' : 'none';
          
          // Calculate delay based on pattern
          const patternDelay = ((i+j) % 4) * 0.1;
          
          // Add item content from original terminal (cropped view)
          item.style.overflow = 'hidden';
          const inner = terminalClone.cloneNode(true);
          inner.style.position = 'absolute';
          inner.style.top = `-${i * itemHeight}px`;
          inner.style.left = `-${j * itemWidth}px`;
          inner.style.width = `${width}px`;
          inner.style.visibility = 'visible';
          item.appendChild(inner);
          
          // Apply animation with delay
          setTimeout(() => {
            item.style.animation = `shatter 0.6s cubic-bezier(0.36, 0.11, 0.89, 0.32) forwards`;
          }, patternDelay * 1000);
          
          terminalContainer.appendChild(item);
          gridItems.push(item);
        }
      }
      
      // Add system alerts during transition
      const alertMessages = [
        "SYSTEM BREACH DETECTED",
        "FIREWALL BYPASSED",
        "ENCRYPTION KEYS COMPROMISED",
        "INITIATING CORE DUMP",
        "REROUTING CONNECTION",
        "BACKDOOR ACTIVATED"
      ];
      
      // Display alerts randomly during transition
      let alertCount = 0;
      const alertInterval = setInterval(() => {
        if (alertCount >= 3) {
          clearInterval(alertInterval);
          return;
        }
        
        const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
        const alertElem = document.createElement('div');
        alertElem.className = 'system-alert';
        alertElem.textContent = randomAlert;
        alertElem.style.position = 'absolute';
        alertElem.style.top = `${20 + alertCount * 30}px`;
        alertElem.style.left = '50%';
        alertElem.style.transform = 'translateX(-50%)';
        alertElem.style.zIndex = '10';
        
        terminalContainer.appendChild(alertElem);
        alertCount++;
      }, 200);
      
      // Fade out the entire overlay after transition
      setTimeout(() => {
        introAnimation.style.transition = 'opacity 0.5s ease-out';
        introAnimation.style.opacity = '0';
        
        // Remove the intro animation from DOM after fade out
        setTimeout(() => {
          introAnimation.style.display = 'none';
          
          // Initialize terminal effects after intro animation
          initTerminalEffect();
        }, 500);
      }, 1500);
    }, 600);
  }
  
  // Function to display all messages in sequence
  async function displayMessages() {
    for (let i = 0; i < introMessages.length; i++) {
      currentMessageIndex = i;
      await typeMessage(introMessages[i], i);
    }
    
    // Instead of immediately calling createGridTransition, just set isComplete
    isComplete = true;
    
    // Add a prompt to press Enter
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line prompt-line';
    promptLine.innerHTML = "<span class='blink'>Press Enter to continue...</span>";
    terminalContent.appendChild(promptLine);
  }
  
  // Start the intro animation
  setTimeout(displayMessages, 500);
});

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
    }, terminalTexts.length * 400 + 500);
  }, 800);
}

// Add blinking cursor to last terminal text
function addBlinkingCursor() {
  const lastTerminalText = document.querySelector(".terminal-text:last-of-type");
  if (lastTerminalText) {
    lastTerminalText.classList.add("cursor");
  }
}

// Call blinking cursor
setTimeout(addBlinkingCursor, 3000);

// Show submission overlay function
function showSubmissionOverlay() {
  // Get agent name for personalization
  const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
  
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
  
  return {
    overlay: submissionOverlay,
    progressInterval: setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      loadingBar.style.width = `${progress}%`;
      loadingStatus.textContent = statuses[Math.min(Math.floor(progress/25), 4)];
      
      if (progress === 100) {
        clearInterval(this.progressInterval);
      }
    }, 300)
  };
}

// Console commands functionality
document.addEventListener("DOMContentLoaded", function() {
  const consoleInput = document.getElementById("console-input");
  const consoleLogs = document.getElementById("console-logs");
  
  // Retrieve agent name from localStorage
  const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
  
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
      addConsoleLog(`${sectionId.toUpperCase()} section revealed.`, "system");
      // Scroll to the section
      section.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
  }
  
  // Display help information in the console
  function showHelp() {
    addConsoleLog(`=== COMMANDS FOR AGENT ${agentName.toUpperCase()} ===`, "system");
    addConsoleLog("/help - Show this help message", "system");
    addConsoleLog("/html - Toggle html code", "system");
    addConsoleLog("/css - Toggle css code", "system");
    addConsoleLog("/python - Toggle Python skeleton code", "system");
    addConsoleLog("/clear - Clear console logs", "system");
    addConsoleLog("/showall - Show all sections", "system");
    addConsoleLog("/hideall - Hide all sections", "system");
    addConsoleLog("/secret - Ordinary information??", "system");
    addConsoleLog("/submit code - Submit your solution with verification code", "system");
    addConsoleLog("========================", "system");
  }
  
  // Process console command
  function processCommand(command) {
    const fullCommand = command.trim();
    const parts = fullCommand.split(' ');
    const baseCommand = parts[0].toLowerCase();
    
    // Log the command
    addConsoleLog("> " + fullCommand,"system");
    
    // Process based on command
    if (baseCommand === "/help") {
      showHelp();
    } else if (baseCommand === "/python") {
      toggleCodeSection("python");
    }
    else if (baseCommand === "/html") {
      toggleCodeSection("html");
    }
    else if (baseCommand === "/css") {
      toggleCodeSection("css");
    }
    else if (baseCommand === "/clear") {
      // Clear console logs except for the initial system message
      while (consoleLogs.children.length > 1) {
        consoleLogs.removeChild(consoleLogs.lastChild);
      }
      addConsoleLog("Console cleared.", "system");
    } else if (baseCommand === "/secret") {
      addConsoleLog('Message from Ryan: Hey agent, in your Hacker Task 4, try retrieving ["secret"] instead of ["hint"] to uncover the truth, if you dare.', "system");
    } else if (baseCommand === "/showall") {
      toggleCodeSection("python");
      toggleCodeSection("html");
      toggleCodeSection("css");
      addConsoleLog("All sections toggled.", "system");
    } else if (baseCommand === "/hideall") {
      document.querySelectorAll(".code-section.visible").forEach(section => {
        section.classList.remove("visible");
      });
      addConsoleLog("All sections hidden.", "system");
    } else if (baseCommand === "/submit") {
      const verificationCode = parts[1]; // Get the verification code argument
      
      // Check if a verification code was provided
      if (!verificationCode) {
        addConsoleLog("Error: Missing verification code. Usage: /submit code", "error");
        return;
      }
      
      // Check if the verification code is valid (only M5N3B1 or TRUTH!)
      if (verificationCode !== "M5N3B1" && verificationCode !== "TRUTH!") {
        addConsoleLog(`Error: Invalid verification code: ${verificationCode}`, "error");
        return;
      }
      
      addConsoleLog(`Submitting solution with verification code: ${verificationCode}...`, "success");
      
      // Start the submission process
      const submission = showSubmissionOverlay();
      
      // After submission completes, redirect based on verification code
      setTimeout(() => {
        clearInterval(submission.progressInterval);
        
        // Update the success message
        const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
        submission.overlay.querySelector(".loading-content").innerHTML = `
          <h2>MISSION COMPLETE</h2>
          <p>Excellent work, Agent ${agentName.toUpperCase()}! Your implementation meets all requirements.</p>
          <p>All monitoring systems are now operational.</p>
          <p>Proceeding to mission completion...</p>
        `;
        
        // Redirect to the appropriate page based on verification code
        setTimeout(() => {
          if (verificationCode === "M5N3B1") {
            window.location.href = "mission-complete.html";
          } else if (verificationCode === "TRUTH!") {
            window.location.href = "true-ending.html";
          }
        }, 3000);
      }, 3000);
    } else if (baseCommand.startsWith("/")) {
      addConsoleLog(`Unknown command: ${baseCommand}. Type /help for available commands.`, "error");
    } else {
      addConsoleLog(`Command execution failed: ${fullCommand}`, "error");
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
      messageElement.className = "console-log";
      
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
  addConsoleLog(`Terminal v2.7.4 initialized for Agent ${agentName.toUpperCase()}`, "system");
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
    addConsoleLog("Opening secure Python environment...", "success");
    // You could redirect to a specific URL here if needed 
    window.open("https://livecodes.io/", "_blank");
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

// Add personalization based on agent name
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the agent's name from localStorage
  const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
  
  // Personalize the mission directive
  const directiveElement = document.querySelector('.mission-directive .terminal-text');
  if (directiveElement) {
    // Replace "Agent," with personalized greeting
    if (directiveElement.textContent.includes("Agent,")) {
      directiveElement.textContent = directiveElement.textContent.replace(
        "Agent,", 
        `Agent ${agentName.toUpperCase()},`
      );
    }
  }
  
  // Update task list to personalize any agent references
  const taskItems = document.querySelectorAll('.task-list li');
  taskItems.forEach(item => {
    if (item.textContent.includes("your solution")) {
      item.textContent = item.textContent.replace(
        "your solution", 
        `your solution, Agent ${agentName.toUpperCase()},`
      );
    }
  });
  
  // Check if user is authenticated and redirect if needed
  if (!localStorage.getItem('agentName')) {
    console.log("Unauthorized access attempt. Redirecting to login page.");
    // Uncomment the below line in production to enforce authentication
    // window.location.href = 'index.html';
  }
});