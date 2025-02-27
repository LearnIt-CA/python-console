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

// Expand/collapse module content
document.querySelectorAll('.expand-btn').forEach(button => {
  button.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const contentElement = document.getElementById(targetId);
    
    // Toggle the expanded class on the content
    contentElement.classList.toggle('expanded');
    
    // Toggle the active class on the button
    this.classList.toggle('active');
    
    // Update button text
    if (contentElement.classList.contains('expanded')) {
      this.textContent = 'COLLAPSE';
    } else {
      this.textContent = 'EXPAND';
    }
  });
});

// Copy code functionality
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const codeBlock = document.getElementById(targetId);
    const textToCopy = codeBlock.textContent;
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
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
      })
      .catch(err => {
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

// Terminal typing effect for text
function initTerminalEffect() {
  const terminalTexts = document.querySelectorAll(".terminal-text");
  
  // Hide all text initially
  terminalTexts.forEach(el => {
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
  
  // Start revealing terminal text after a short delay
  setTimeout(() => {
    revealElements(terminalTexts, 500);
    
    // Show begin mission button after all text is revealed
    setTimeout(() => {
      document.getElementById("begin-mission-btn").classList.add("button-revealed");
    }, terminalTexts.length * 500 + 1000);
  }, 800);
}

// Initialize the terminal effect
document.addEventListener("DOMContentLoaded", initTerminalEffect);

// Begin mission button action with transition
document
  .getElementById("begin-mission-btn")
  .addEventListener("click", function () {
    // First scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add a short delay before showing transition effects to ensure scrolling completes
    setTimeout(() => {
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
        "Analyzing Phantom's communication patterns...",
        "Preparing code analysis tools...",
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
            window.location.href = 'part1.html';
          }, 1500);
        }
      }, 300);
    }, 500); // 500ms delay to ensure scrolling completes
  });

// Console commands functionality
document.addEventListener("DOMContentLoaded", function() {
  const consoleInput = document.getElementById("console-input");
  const consoleLogs = document.getElementById("console-logs");
  
  // Collection of training-related system messages
  const trainingMessages = [
    "Reviewing Python basics...",
    "Analyzing agent skill level...",
    "Compiling training materials...",
    "Secure connection maintained...",
    "Monitoring training progress...",
    "Checking for security vulnerabilities...",
    "Updating Python syntax database...",
    "Running code verification systems...",
    "Analyzing learning patterns...",
    "System integrity check: PASSED",
    "Agent training protocol: ACTIVE",
    "Python interpreter v3.11 ready",
    "Training module 4 of 7 completed",
    "Memory usage: 42% - within parameters",
    "Training effectiveness: 89%",
    "Syntax error detection online",
    "Logic analysis tools initialized",
    "Algorithm efficiency scanner ready",
    "Code execution sandbox active",
    "Security protocols enabled",
    "Training data encrypted",
    "Resources allocation optimized",
    "Python libraries validated",
    "Agent potential assessment: HIGH",
    "Mission readiness increasing: 73%"
  ];
  
  // Function to add log to console
  function addConsoleLog(message, type = "") {
    const logElement = document.createElement("div");
    logElement.className = `console-log ${type}`;
    logElement.textContent = message;
    consoleLogs.appendChild(logElement);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
    
    // Limit the number of logs to prevent performance issues
    if (consoleLogs.children.length > 50) {
      consoleLogs.removeChild(consoleLogs.children[0]);
    }
  }
  
  // Toggle module expansion
  function toggleModule(moduleId) {
    const module = document.getElementById(`module-${moduleId}`);
    if (!module) {
      addConsoleLog(`Error: Module "${moduleId}" not found.`, "error");
      return false;
    }
    
    const contentId = `${moduleId}-content`;
    const content = document.getElementById(contentId);
    const button = module.querySelector(`.expand-btn[data-target="${contentId}"]`);
    
    if (content.classList.contains("expanded")) {
      content.classList.remove("expanded");
      button.textContent = "EXPAND";
      button.classList.remove("active");
      addConsoleLog(`Module ${moduleId.toUpperCase()} collapsed.`, "system");
    } else {
      content.classList.add("expanded");
      button.textContent = "COLLAPSE";
      button.classList.add("active");
      addConsoleLog(`Module ${moduleId.toUpperCase()} expanded.`, "success");
      
      // Scroll to the module
      module.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    return true;
  }
  
  // Display help information in the console
  function showHelp() {
    addConsoleLog("=== AVAILABLE COMMANDS ===", "system");
    addConsoleLog("/help - Show this help information", "system");
    addConsoleLog("/module [name] - Toggle specific module", "system");
    addConsoleLog("/expand-all - Expand all modules", "system");
    addConsoleLog("/collapse-all - Collapse all modules", "system");
    addConsoleLog("/start-mission - Proceed to mission", "system");
    addConsoleLog("/clear - Clear console logs", "system");
    addConsoleLog("/status - Show training status", "system");
    addConsoleLog("Available modules: variables, datatypes, operations, functions, io, conditionals, loops, cheatsheet", "system");
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
    } else if (command.startsWith("/module ")) {
      const moduleId = command.split(" ")[1];
      if (!moduleId) {
        addConsoleLog("Error: Module name required. Use /help for available modules.", "error");
      } else {
        toggleModule(moduleId);
      }
    } else if (command === "/expand-all") {
      const modules = ["variables", "datatypes", "operations", "functions", "io", "conditionals", "loops", "cheatsheet"];
      modules.forEach(moduleId => {
        const contentId = `${moduleId}-content`;
        const content = document.getElementById(contentId);
        const button = document.querySelector(`.expand-btn[data-target="${contentId}"]`);
        
        content.classList.add("expanded");
        button.textContent = "COLLAPSE";
        button.classList.add("active");
      });
      addConsoleLog("All modules expanded.", "success");
    } else if (command === "/collapse-all") {
      document.querySelectorAll(".module-content.expanded").forEach(content => {
        content.classList.remove("expanded");
        const targetId = content.id;
        const button = document.querySelector(`.expand-btn[data-target="${targetId}"]`);
        button.textContent = "EXPAND";
        button.classList.remove("active");
      });
      addConsoleLog("All modules collapsed.", "system");
    } else if (command === "/clear") {
      // Clear console logs except for the initial system message
      while (consoleLogs.children.length > 1) {
        consoleLogs.removeChild(consoleLogs.lastChild);
      }
      addConsoleLog("Console cleared.", "system");
    } else if (command === "/status") {
      addConsoleLog("=== TRAINING STATUS ===", "success");
      addConsoleLog("Status: IN PROGRESS", "success");
      addConsoleLog("Modules available: 8", "system");
      addConsoleLog("Training completion: 67%", "system");
      addConsoleLog("Python proficiency required: Beginner-Intermediate", "system");
      addConsoleLog("Mission readiness: PENDING", "system");
      addConsoleLog("=====================", "system");
    } else if (command === "/start-mission") {
      addConsoleLog("Initializing mission sequence...", "success");
      setTimeout(() => {
        // Trigger the button click event for the mission button
        document.getElementById("begin-mission-btn").click();
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
    if (consoleLogs.children.length < 20) {
      const messageElement = document.createElement("div");
      messageElement.className = "console-log system";
      
      // Select a random message
      const message = trainingMessages[Math.floor(Math.random() * trainingMessages.length)];
      messageElement.textContent = message;
      
      // Randomly add numeric codes or status indicators
      if (Math.random() > 0.7) {
        const status = Math.random() > 0.5 ? "OK" : "PENDING";
        const code = Math.floor(Math.random() * 999);
        messageElement.textContent += ` [${status}:${code}]`;
      }
      
      consoleLogs.appendChild(messageElement);
      consoleLogs.scrollTop = consoleLogs.scrollHeight;
      
      // Limit the number of logs to prevent performance issues
      if (consoleLogs.children.length > 50) {
        consoleLogs.removeChild(consoleLogs.children[0]);
      }
    }
    
    // Schedule next message at random interval
    setTimeout(simulateSystemMessages, Math.random() * 5000 + 3000);
  }
  
  // Initialize console
  addConsoleLog("CSIS Training Module v3.2.1 initialized", "system");
  addConsoleLog("Connected to secure training server", "system");
  addConsoleLog("Type /help for available commands", "system");
  
  // Start system message simulation
  setTimeout(simulateSystemMessages, 2000);
});

// Apply syntax highlighting to code blocks
document.addEventListener("DOMContentLoaded", function() {
    // Simple syntax highlighter for Python code
    function highlightPythonSyntax(codeElement) {
      let codeText = codeElement.textContent; // Use textContent instead of innerHTML
      let highlightedCode = '';
      
      // Split code into lines for easier processing
      const lines = codeText.split('\n');
      
      lines.forEach(line => {
        // Check for comments first (starts with #)
        if (line.trim().startsWith('#')) {
          highlightedCode += `<span class="comment">${line}</span>\n`;
          return;
        }
        
        // Process the line character by character
        let processed = '';
        let i = 0;
        
        // Check for strings
        let inString = false;
        let stringDelimiter = '';
        let currentToken = '';
        
        while (i < line.length) {
          const char = line[i];
          
          // Handle strings (both single and double quotes)
          if ((char === '"' || char === "'") && (i === 0 || line[i-1] !== '\\')) {
            if (!inString) {
              // Starting a string
              inString = true;
              stringDelimiter = char;
              currentToken += char;
            } else if (char === stringDelimiter) {
              // Ending a string
              currentToken += char;
              processed += `<span class="string">${currentToken}</span>`;
              currentToken = '';
              inString = false;
            } else {
              // A quote character inside a different type of string
              currentToken += char;
            }
          } else if (inString) {
            // Inside a string, just accumulate the character
            currentToken += char;
          } else if (char === '#') {
            // Comment starts - process any accumulated token
            if (currentToken) {
              processed += processToken(currentToken);
              currentToken = '';
            }
            // Add the rest of the line as a comment
            processed += `<span class="comment">${line.slice(i)}</span>`;
            break; // End processing this line
          } else if (/[a-zA-Z0-9_]/.test(char)) {
            // Part of an identifier or keyword
            currentToken += char;
          } else {
            // Process any accumulated token before the special character
            if (currentToken) {
              processed += processToken(currentToken);
              currentToken = '';
            }
            
            // Check for function calls
            if (char === '(' && processed.endsWith('<span class="function">')) {
              processed = processed.slice(0, -24); // Remove the span
              processed += char;
            } else {
              processed += char;
            }
          }
          
          i++;
        }
        
        // Process any remaining token
        if (currentToken) {
          processed += processToken(currentToken);
        }
        
        highlightedCode += processed + '\n';
      });
      
      // Helper function to process a token (check if it's a keyword, etc.)
      function processToken(token) {
        const keywords = ["def", "if", "else", "elif", "for", "while", "in", "return", "import", 
                         "from", "as", "break", "continue", "and", "or", "not", "True", "False", 
                         "None", "class", "try", "except", "finally", "print"];
        
        // Check if token is a number
        if (/^\d+(\.\d+)?$/.test(token)) {
          return `<span class="number">${token}</span>`;
        }
        // Check if token is a keyword
        else if (keywords.includes(token)) {
          return `<span class="keyword">${token}</span>`;
        }
        // Check if token is followed by an opening parenthesis (function)
        else if (i < line.length && line[i] === '(') {
          return `<span class="function">${token}</span>`;
        }
        // Just a regular token
        else {
          return token;
        }
      }
      
      codeElement.innerHTML = highlightedCode;
    }
    
    // Apply syntax highlighting to all code blocks
    document.querySelectorAll('.code-block').forEach(highlightPythonSyntax);
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the agent's name from localStorage
    const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
    
    // Replace "Agent" with the actual agent name in the directive panel
    const directiveTexts = document.querySelectorAll(".directive-panel .terminal-text");
    if (directiveTexts.length > 0) {
      // Update the first paragraph that contains "Agent,"
      const firstPara = directiveTexts[0];
      if (firstPara.textContent.includes("Agent,")) {
        firstPara.textContent = firstPara.textContent.replace(
          "Agent,", 
          `Agent ${agentName.toUpperCase()},`
        );
      }
    }
    
    // Also update training directive at the bottom
    const trainingDirectiveTexts = document.querySelectorAll(".training-directive .terminal-text");
    trainingDirectiveTexts.forEach(text => {
      if (text.textContent.includes("these Python concepts")) {
        // This is likely the concluding paragraph
        text.textContent = text.textContent.replace(
          "you'll be ready", 
          `you'll be ready, Agent ${agentName.toUpperCase()},`
        );
      }
    });
    
    // Update button text if needed
    const missionButton = document.getElementById("begin-mission-btn");
    if (missionButton) {
      missionButton.textContent = `PROCEED TO MISSION, AGENT ${agentName.toUpperCase()}`;
    }
    
    // Also consider redirecting unauthorized users
    if (!localStorage.getItem('agentName')) {
      console.log("Unauthorized access attempt. Redirecting to login page.");
      // Uncomment the below line in production to enforce authentication
      //window.location.href = 'index.html';
    }
  });