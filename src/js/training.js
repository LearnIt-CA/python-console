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
  // Add command listener for secure environment link
  document.querySelector('.env-link').addEventListener('click', function(e) {
    e.preventDefault();
    // You could redirect to a specific URL here if needed
    window.open("https://livecodes.io/?template=python", "_blank");
  });
// Intro animation sequence - similar to briefing.js
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the agent's name from localStorage
  const agentName = localStorage.getItem('agentName') || 'AGENT';
  
  // Training-specific intro messages
  const introMessages = [
    `Agent ${agentName.toUpperCase()}, before we start our mission ...`,
    "We've prepared a special Python training program for you.",
    "This mission is urgent and critical, so we must ensure everything is perfect.",
    "I'm confident this training will be a piece of cake for someone with your abilities.",
    `Good luck, Agent ${agentName.toUpperCase()}. talk to you soon.`
];

  // DOM elements
  const introAnimation = document.getElementById('intro-animation');
  const terminalContent = document.getElementById('terminal-content');
  const terminalContainer = document.querySelector('.terminal-container');
  const trainingPage = document.getElementById('training-page');
  
  // Add computational overlay for effects
  const compOverlay = document.createElement('div');
  compOverlay.className = 'computational-overlay';
  terminalContainer.appendChild(compOverlay);
  
  // Make sure main content is hidden during intro
  document.querySelector('.container').style.opacity = '0';
  
  // Clear any existing content
  terminalContent.innerHTML = '';
  
  let currentMessageIndex = 0;
  let isComplete = false;
  
  // Function to create a typing effect for a message
  function typeMessage(message, index) {
    return new Promise(resolve => {
      // Create a new line element
      const line = document.createElement('div');
      line.className = 'terminal-line';
      
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
      
      // Typing speed based on message length
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
    // Always allow skipping the intro animation with Enter
    createGridTransition();
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
        "LOADING PYTHON TRAINING MODULES",
        "INITIALIZING CODE ENVIRONMENT",
        "COMPILING EXAMPLES",
        "PREPARING INTERACTIVE CONTENT",
        "TRAINING READY"
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
        
        // Show the main content after intro animation is gone
        setTimeout(() => {
          introAnimation.style.display = 'none';
          document.querySelector('.container').style.opacity = '1';
          
          // Initialize the terminal effect for text elements
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
    
    // After all messages, show "PRESS ENTER TO CONTINUE" prompt
    await typeMessage("PRESS ENTER TO CONTINUE", introMessages.length);
    isComplete = true;
  }
  
  // Start the intro animation
  setTimeout(displayMessages, 500);
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
      if (firstPara && firstPara.textContent.includes("Agent,")) {
        firstPara.textContent = firstPara.textContent.replace(
          "Agent,", 
          `Agent ${agentName.toUpperCase()},`
        );
      }
    }
    
    // Also update training directive at the bottom
    const trainingDirectiveTexts = document.querySelectorAll(".training-directive .terminal-text");
    trainingDirectiveTexts.forEach(text => {
      if (text && text.textContent.includes("these Python concepts")) {
        // This is likely the concluding paragraph
        text.textContent = text.textContent.replace(
          "you'll be ready", 
          `you'll be ready, Agent ${agentName.toUpperCase()},`
        );
      }
    });
    
    // Update button text to use the agent name and secondary color
    const missionButton = document.getElementById("begin-mission-btn");
    if (missionButton) {
      missionButton.textContent = `PROCEED TO MISSION, AGENT ${agentName.toUpperCase()}`;
      missionButton.classList.add("secondary-button");
    }
    
    // Also consider redirecting unauthorized users
    if (!localStorage.getItem('agentName')) {
      console.log("Unauthorized access attempt. Redirecting to login page.");
      // Uncomment the below line in production to enforce authentication
      //window.location.href = 'index.html';
    }
  });