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

// Intro animation sequence - With updated messages
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the agent's name from localStorage
  const agentName = localStorage.getItem('agentName') || 'AGENT';
  
  // New briefing-specific messages with agent name
  const introMessages = [
    `Alright Agent ${agentName.toUpperCase()}, welcome aboard`,
    "Let me bring you up to speed on your mission.",
    "We're tracking a hacker known as 'Phantom' who stole $1.5 billion in cryptocurrency.",
    "Phantom uses a simple 'Higher or Lower' game to communicate with buyers.",
    "Your mission is to recreate this game in Python",
    "Replace his system with our version.",
    "This will allow us to intercept and monitor all his communications without detection.",
    "Here is what you gonna do"
  ];

  // DOM elements
  const introAnimation = document.getElementById('intro-animation');
  const terminalContent = document.getElementById('terminal-content');
  const terminalContainer = document.querySelector('.terminal-container');
  const missionPage = document.getElementById('mission-page');
  
  // Add computational overlay for effects
  const compOverlay = document.createElement('div');
  compOverlay.className = 'computational-overlay';
  terminalContainer.appendChild(compOverlay);
  
  // Make sure mission page is hidden
  missionPage.style.display = 'none';
  
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
      
      // Add system alerts during transition - with briefing-specific alerts
      const alertMessages = [
        "ACCESSING MISSION DATA",
        "DECRYPTING PHANTOM FILES",
        "RETRIEVING TARGET INFORMATION",
        "PREPARING MISSION BRIEFING",
        "MISSION DETAILS LOADED"
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
        
        // Show the mission page after intro animation is gone
        setTimeout(() => {
          introAnimation.style.display = 'none';
          missionPage.style.display = 'block';
          
          // Initialize the terminal effect for objective items
          animateObjectiveItems();
          
          // Setup the target info click handler
          setupTargetInfoClickHandler();
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

// Function to animate objective items - improved for stable height
function animateObjectiveItems() {
  const objectiveItems = document.querySelectorAll(".objective-item");
  const missionText = document.querySelector(".objective-panel .mission-text");
  const targetInfo = document.querySelector(".target-frame p");
  
  // First ensure all items have proper display setting but remain invisible
  objectiveItems.forEach(item => {
    item.style.display = "block";
    item.style.visibility = "hidden";
  });
  
  if (missionText) {
    missionText.style.display = "block";
    missionText.style.visibility = "hidden";
  }
  
  // Add animation to target info paragraph if it exists
  if (targetInfo) {
    targetInfo.classList.add("typed");
  }
  
  // Then show them one by one with typing effect
  let index = 0;
  
  function showNextItem() {
    if (index < objectiveItems.length) {
      const item = objectiveItems[index];
      item.style.visibility = "visible";
      item.classList.add("visible");
      item.classList.add("typed");
      index++;
      setTimeout(showNextItem, 250); // Faster typing for objectives
    } else if (missionText) {
      // Show mission text after objectives
      setTimeout(() => {
        missionText.style.visibility = "visible";
        missionText.classList.add("typed");
        
        // Show begin mission button after all items are revealed
        setTimeout(() => {
          document.getElementById("begin-mission-btn").classList.add("button-revealed");
        }, 500);
      }, 300);
    } else {
      // If no mission text, just show the button
      setTimeout(() => {
        document.getElementById("begin-mission-btn").classList.add("button-revealed");
      }, 500);
    }
  }
  
  // Start showing items after a short delay
  setTimeout(showNextItem, 500);
}

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