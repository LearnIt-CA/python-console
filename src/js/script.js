document.addEventListener('DOMContentLoaded', function() {
  // More conversational messages with Ryan connection
  const introMessages = [
    "Hey there, rookie! Nice to meet you.",
    "I believe you've met Agent Ryan already, he's one of our best agents in the field.",
    "Ryan told me he's found an unpolished gem in you, I trust his judgment completely",
    "Now, I need you to log into our classified portal."
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
          // Your existing login screen should now be visible
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

// Authorized users list - keep original names and add new ones
const authorizedUsers = [
  "sean",
  "ethan",
  "dhiraj",
  "ryan",
  "aishwarya",
  "agent 0",
  "Arraial Cabral, Afonso",
  "Blankson, Sean",
  "Glover, Jordan",
  "Ikram, Yahya",
  "Marenger, Ethan",
  "Panaccione, Nathan",
  "Salami, Hassan",
  "Chan, Kris",
  "Awan, Khalil",
  "Korjus, Oliver",
  "Esunu, Othniel",
  "Mirian, Valentyna",
  "Zagorodski, Theo",
  "Aba, Sean",
  "Alnakhal, Omar",
  "Amaral, Seth",
  "Anduse, Mesih",
  "Dinnes, Nathan",
  "Genc, Beyazit",
  "Gezahegn, Lael",
  "Ibekwe, Daniel",
  "Mendis, Antonio",
  "Mutraji, Abdullah",
  "Ngo, Ethan",
  "Ruth, Travis",
  "To, Aiden",
  "Vong, Daniel"
];

// Authentication button click handler 
document.getElementById("auth-button").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  const messageElement = document.getElementById("message");
  const authButton = this;
  
  // Disable the authentication button immediately
  authButton.disabled = true;
  authButton.style.opacity = "0.6";
  authButton.style.cursor = "not-allowed";

  // Check if username is in authorized list (case insensitive)
  const isAuthorized = authorizedUsers.some(user => {
    return username.toLowerCase().replace(/\s+/g, "") === user.toLowerCase().replace(/\s+/g, "") || 
           username.toLowerCase().replace(/\s+/g, "").includes(user.toLowerCase().replace(/\s+/g, ""));
  });

  if (isAuthorized) {
    // Determine which name matched and extract last name
    let parts = "";
    let lastname = "";
    let firstname = "";
    let fullname = "";
    
    // Special case for original users (sean, ethan, dhiraj)
    if (username.toLowerCase().replace(/\s+/g, "") === "sean" || 
        username.toLowerCase().replace(/\s+/g, "").includes("sean")) {
      lastname = "sean";
    } else if (username.toLowerCase().replace(/\s+/g, "") === "ethan" || 
              username.toLowerCase().replace(/\s+/g, "").includes("ethan")) {
      lastname = "ethan";
    } else if (username.toLowerCase().replace(/\s+/g, "") === "dhiraj" || 
              username.toLowerCase().replace(/\s+/g, "").includes("dhiraj")) {
      lastname = "dhiraj";
    } else if (username.toLowerCase().replace(/\s+/g, "") === "ryan" || 
              username.toLowerCase().replace(/\s+/g, "").includes("ryan")) {
      lastname = "ryan";
    } else if (username.toLowerCase().replace(/\s+/g, "") === "aishwarya" || 
              username.toLowerCase().replace(/\s+/g, "").includes("aishwarya")) {
      lastname = "aishwarya";
    } else if (username.toLowerCase().replace(/\s+/g, "") === "agent 0" || 
              username.toLowerCase().replace(/\s+/g, "").includes("agent 0")) {
      lastname = "0";
    } else {
      // For new users, extract the last name (first word in the full name)
      for (const user of authorizedUsers) {
        if (username.toLowerCase().replace(/\s+/g, "") === user.toLowerCase().replace(/\s+/g, "") || 
            username.toLowerCase().replace(/\s+/g, "").includes(user.toLowerCase().replace(/\s+/g, ""))) {
          // Get the first part as last name
          parts = user.split(",");
          lastname = parts[0].trim();
          firstname = parts[1].trim();
          fullname = `${firstname} ${lastname}`;
          break;
        }
      }
    }
    
    // Store the last name in localStorage
    localStorage.setItem('agentName', lastname);
    localStorage.setItem('agentFullName', fullname);
    
    messageElement.textContent =
      "Authentication successful. Initializing secure connection...";
    messageElement.style.color = "#00ff41";

    // Show progress bar
    document.getElementById("progress-bar").classList.remove("hidden");

    // Simulate loading progress
    let progress = 0;
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");

    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;

      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${Math.floor(progress)}%`;

      if (progress === 100) {
        clearInterval(interval);
        
        // Redirect to the next page directly after loading completes
        setTimeout(() => {
          window.location.href = "briefing.html";
        }, 500);
      }
    }, 200);
  } else {
    messageElement.textContent =
      "ACCESS DENIED: Unauthorized user detected. Security alert initiated.";
    messageElement.style.color = "#ff0043";

    // Add glitch effect to page on failed login
    document.body.classList.add("glitch");
    setTimeout(() => {
      document.body.classList.remove("glitch");
      
      // Re-enable the button after 2 seconds for failed attempts
      setTimeout(() => {
        authButton.disabled = false;
        authButton.style.opacity = "1";
        authButton.style.cursor = "pointer";
      }, 2000);
    }, 1000);
  }
});

// 添加回车键支持
document.getElementById("username").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    document.getElementById("auth-button").click();
  }
});

// Continue button action - not needed anymore but keeping for reference
document.getElementById("continue-btn").addEventListener("click", function () {
  window.location.href = "briefing.html";
});

// Terminal typing effect
function typeEffect() {
  const terminalText = document.querySelectorAll(".terminal-text:not(.typed)");
  if (terminalText.length > 0) {
    terminalText[0].classList.add("typed");
    terminalText[0].style.display = "block";
  }
}

// Initialize terminal with typing effect
document.querySelectorAll(".terminal-text").forEach((line) => {
  line.style.display = "none";
});

let lineIndex = 0;
const terminalLines = document.querySelectorAll(".terminal-text");

function typeNextLine() {
  if (lineIndex < terminalLines.length) {
    terminalLines[lineIndex].style.display = "block";
    lineIndex++;
    setTimeout(typeNextLine, 500);
  }
}

// Start typing effect
setTimeout(typeNextLine, 1000);

// Additional CSS injection for console height and layout changes
document.addEventListener("DOMContentLoaded", function() {
  // Create style element
  const style = document.createElement('style');
  
  // Add custom styles to fix console layout
  style.textContent = `
    .command-console {
      height: 200px !important;
    }
    
    .console-input-area {
      width: 50% !important;
      align-items: flex-start !important;
    }
    
    .console-logs {
      width: 50% !important;
      max-height: 200px !important;
    }
    
    .mission-page {
      padding-bottom: 220px !important;
    }
  `;
  
  // Append style to head
  document.head.appendChild(style);
});