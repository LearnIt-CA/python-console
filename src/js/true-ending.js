// Intro animation sequence
document.addEventListener('DOMContentLoaded', function() {
  const introMessages = [
    "MONITORING PROTOCOLS INITIATED...",
    "DATA STREAM ACTIVE...",
    "> Oh, look who's finally checking in!",
    "> I see you've found the hidden section",
    "> Did you really think you were tracking the RIGHT person this whole time?",
    "> Poor Ms. Bucco must be wondering why she's being investigated.",
    "> Yes, I planted everything on her. The logs, the communications, all of it.",
    "> Your agency has been following the wrong lead all along.",
    "> And now that you're here... I have YOU, and your entire system."
  ];

  // Semantic indicators for each message to control animation speed and style
  const messageSemantics = [
    { speed: 'normal', glitchLevel: 0, class: 'system' },     // system message 1
    { speed: 'normal', glitchLevel: 0, class: 'system' },     // system message 2
    { speed: 'normal', glitchLevel: 1, class: 'villain' },    // casual villain intro
    { speed: 'normal', glitchLevel: 1, class: 'villain' },    // mild surprise
    { speed: 'normal', glitchLevel: 2, class: 'villain' },    // revelation
    { speed: 'slow', glitchLevel: 2, class: 'villain' },      // mocking tone
    { speed: 'medium', glitchLevel: 3, class: 'villain' },    // pride in deception
    { speed: 'fast', glitchLevel: 4, class: 'villain' },      // escalating threat
    { speed: 'very-fast', glitchLevel: 5, class: 'villain' }, // final threat
  ];

  // Get DOM elements
  const introAnimation = document.getElementById('intro-animation');
  const terminalContent = document.getElementById('terminal-content');
  const terminalContainer = document.querySelector('.terminal-container');
  const errorAnimation = document.getElementById('error-animation');
  const backgroundOverlay = document.getElementById('background-overlay');
  
  // Add computational overlay for effects
  const compOverlay = document.createElement('div');
  compOverlay.className = 'computational-overlay';
  terminalContainer.appendChild(compOverlay);
  
  // Clear any existing content
  terminalContent.innerHTML = '';
  
  let currentMessageIndex = 0;
  
  // Function to create a random glitch effect - less intense
  function createRandomGlitch() {
    const glitchLine = document.createElement('div');
    glitchLine.className = 'glitch-line';
    glitchLine.style.top = `${Math.random() * 100}%`;
    glitchLine.style.height = `${Math.random() * 5 + 1}px`;
    glitchLine.style.opacity = '0.5';
    document.body.appendChild(glitchLine);
    
    setTimeout(() => {
      glitchLine.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(glitchLine);
      }, 300);
    }, 200);
  }
  
  // Function to create a typing effect for a message
  function typeMessage(message, index) {
    return new Promise(resolve => {
      // Create a new line element
      const line = document.createElement('div');
      line.className = 'terminal-line';
      
      // Apply semantic styling based on message type
      const semantics = messageSemantics[index];
      
      // Add appropriate classes
      if (semantics.class === 'villain') {
        line.classList.add('villain');
        line.classList.add(`level-${semantics.glitchLevel}`);
        
        // Add glitch effect for higher level messages
        if (semantics.glitchLevel >= 2) {
          const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
              createRandomGlitch();
            }
          }, 1000);
          
          // Clear interval after 3 seconds
          setTimeout(() => {
            clearInterval(glitchInterval);
          }, 3000);
        }
        
        // Add terminal glitch for highest level messages
        if (semantics.glitchLevel >= 4) {
          setTimeout(() => {
            terminalContainer.classList.add('terminal-glitch');
            setTimeout(() => {
              terminalContainer.classList.remove('terminal-glitch');
            }, 150);
          }, 100);
        }
      } else {
        line.classList.add(semantics.class);
      }
      
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
      
      // Adjust typing duration based on semantics and content
      let typingDuration;
      
      switch (semantics.speed) {
        case 'slow':
          typingDuration = Math.min(message.length * 50, 2200); // Slow, dramatic effect
          break;
        case 'medium':
          typingDuration = Math.min(message.length * 40, 1800); // Medium pace
          break;
        case 'fast':
          typingDuration = Math.min(message.length * 30, 1400); // Faster, more urgent
          break;
        case 'very-fast':
          typingDuration = Math.min(message.length * 25, 1000); // Very fast, climactic
          break;
        default:
          typingDuration = Math.min(message.length * 35, 1600); // Normal pace
      }
      
      // Set the animation duration dynamically
      typingSpan.style.animationDuration = `${typingDuration}ms`;
      
      // Auto-scroll to bottom
      setTimeout(() => {
        terminalContent.scrollTop = terminalContent.scrollHeight;
      }, 50);
      
      // Add proper pauses after each message type
      let pauseAfterTyping = 200;
      
      // Add longer pauses for dramatic effect after important revelations
      if (index === 4 || index === 6) {
        pauseAfterTyping = 800; // Longer pause after key revelations
      } else if (index === 7) {
        pauseAfterTyping = 500; // Medium pause before final message
      }
      
      // Resolve after animation completes
      setTimeout(resolve, typingDuration + pauseAfterTyping);
    });
  }
  
  // Create grid transition effect with smoother shaking
  function createGridTransition() {
    // First apply a glitch effect to the terminal
    terminalContainer.classList.add('terminal-glitch');
    
    setTimeout(() => {
      // Make terminal container shake - less intense
      terminalContainer.classList.add('soft-shake');
      
      // Get the actual position and dimensions of the terminal container
      const terminalRect = terminalContainer.getBoundingClientRect();
      const gridSize = 15; // Grid items for effect
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
          
          // Add smooth rotations for some grid items
          if (Math.random() > 0.7) {
            item.classList.add('smooth-rotation');
          }
          
          item.style.width = `${itemWidth}px`;
          item.style.height = `${itemHeight}px`;
          
          // Use absolute positioning relative to the terminal container
          item.style.position = 'absolute';
          item.style.left = `${j * itemWidth}px`;
          item.style.top = `${i * itemHeight}px`;
          
          // Randomize borders - more subtle
          if (Math.random() > 0.7) {
            item.style.borderLeft = `${Math.random()*2}px solid var(--primary-faint)`;
          }
          if (Math.random() > 0.7) {
            item.style.borderTop = `${Math.random()*2}px solid var(--primary-faint)`;
          }
          
          // Calculate variable delay based on pattern for smoother effect
          const patternDelay = ((i*j) % 7) * 0.1 + Math.random() * 0.2;
          
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
            // Apply smoother shatter animation
            item.style.animation = `smooth-shatter 1.2s cubic-bezier(0.36, 0.11, 0.89, 0.32) forwards`;
          }, patternDelay * 1000);
          
          terminalContainer.appendChild(item);
          gridItems.push(item);
        }
      }
      
      // After short delay, increase shake intensity
      setTimeout(() => {
        terminalContainer.classList.remove('soft-shake');
        terminalContainer.classList.add('mild-shake');
      }, 800);
      
      // Add system messages and code during transition
      createSystemMessagesAndCode(terminalContainer);
      
      // Fade out the intro animation and start error animation
      setTimeout(() => {
        introAnimation.style.transition = 'opacity 0.8s ease-out';
        introAnimation.style.opacity = '0';
        
        // Remove the intro animation from DOM after fade out
        setTimeout(() => {
          introAnimation.style.display = 'none';
          
          // Show error animation with expansion effect
          errorAnimation.classList.remove('hidden');
          
          // Start filling the background
          backgroundOverlay.style.opacity = '1';
          
          // Use setTimeout to trigger the expansion animation
          setTimeout(() => {
            errorAnimation.classList.add('error-expand');
            
            // Start error sequence after the expansion
            setTimeout(() => {
              startErrorSequence();
            }, 1000);
          }, 100);
        }, 800);
      }, 1500);
    }, 600);
  }
  
  // Create system messages and code that fill the screen
  function createSystemMessagesAndCode(container) {
    // System alert messages - neutral system terms
    const alertMessages = [
      "SYSTEM NOTIFICATION",
      "SECURITY PROTOCOLS ACTIVE",
      "DATABASE PROCESSING",
      "SYSTEM CODE A-927-X",
      "AGENT IDENTITY VERIFICATION",
      "PROTOCOL ADJUSTMENT",
      "SYSTEM INTEGRATION IN PROGRESS",
      "ENTITY DETECTED",
      "DATA STREAM ACTIVE",
      "NETWORK ANALYZING",
      "DEFENSE SYSTEMS ONLINE",
      "CONTROL VERIFICATION",
      "CONNECTION CHECKING",
      "SYSTEM STATUS",
      "DATA FLOW ACTIVE",
      "MONITORING ACTIVE",
      "TRACKING SYSTEMS ONLINE",
      "SYSTEM PROCESSING",
      "STATUS UPDATE",
      "COMMAND VERIFIED",
      "SYSTEM CHECKING",
      "STATUS REPORT",
      "AUTHENTICATION PROCESS",
      "KERNEL MONITORING",
      "SECURITY PROTOCOLS ACTIVE",
      "RECOVERY ACTIVE",
      "FIREWALL MONITORING",
      "ENCRYPTION ACTIVE",
      "DATA VERIFICATION",
      "SYSTEM SCAN",
      "CODE VERIFICATION",
      "PROCESS MONITORING",
      "BACKUP SYSTEMS ONLINE",
      "SECURITY SCANNING",
      "NETWORK MONITORING",
      "DEFENSE GRID ONLINE",
      "SECURITY LEVEL 9",
      "SYSTEM MAINTENANCE",
      "EMERGENCY SYSTEMS READY",
      "INTERFACE UPDATED"
    ];
    
    // Code snippets - technical looking terms
    const codeSnippets = [
      "0xFFFFFFFF CHECK",
      "SEGMENT CHECK",
      "MEMORY SCAN: 0x00A2FF45",
      "STACK VERIFICATION",
      "BUFFER CHECKING",
      "NULL POINTER CHECK",
      "HEAP VERIFICATION",
      "VALUE CHECK",
      "FUNCTION 0x8000FFFF",
      "ACCESS CHECKING",
      "CALL TRACE: 0xDEADBEEF",
      "[CHECKING DATA]",
      "REGISTRY SCAN",
      "FFx%$#@^&*!CHECK!^&*$#@%",
      "OS STATUS CHECK"
    ];
    
    // Random hex/binary/symbol characters
    const glitchCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?\\";
    
    // Create glitched code backgrounds
    for (let i = 0; i < 15; i++) {
      const codeBlock = document.createElement('div');
      codeBlock.className = 'code-glitch';
      
      // Generate random glitched code
      let glitchedCode = '';
      const lines = Math.floor(Math.random() * 8) + 2;
      
      for (let j = 0; j < lines; j++) {
        // Mix random characters, binary, and hex
        let line = '';
        const length = Math.floor(Math.random() * 40) + 10;
        
        for (let k = 0; k < length; k++) {
          if (Math.random() > 0.7) {
            line += glitchCharacters.charAt(Math.floor(Math.random() * glitchCharacters.length));
          } else if (Math.random() > 0.5) {
            line += Math.floor(Math.random() * 2); // Binary
          } else {
            line += Math.floor(Math.random() * 16).toString(16).toUpperCase(); // Hex
          }
        }
        
        glitchedCode += line + '\n';
      }
      
      codeBlock.textContent = glitchedCode;
      
      // Position randomly
      codeBlock.style.position = 'absolute';
      codeBlock.style.top = `${Math.random() * 100}%`;
      codeBlock.style.left = `${Math.random() * 100}%`;
      codeBlock.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`;
      codeBlock.style.fontSize = `${0.5 + Math.random() * 0.5}rem`;
      codeBlock.style.fontFamily = '"Share Tech Mono", monospace';
      codeBlock.style.whiteSpace = 'pre';
      codeBlock.style.zIndex = '5';
      codeBlock.style.opacity = '0.4';
      codeBlock.style.pointerEvents = 'none';
      
      container.appendChild(codeBlock);
    }
    
    // Add alert messages gradually, not all at once
    let alertCount = 0;
    const alertInterval = setInterval(() => {
      if (alertCount >= 40) {
        clearInterval(alertInterval);
        return;
      }
      
      // Randomly choose between alert message or code snippet
      const messageType = Math.random();
      let textContent;
      
      if (messageType > 0.6) {
        textContent = alertMessages[Math.floor(Math.random() * alertMessages.length)];
      } else if (messageType > 0.3) {
        textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      } else {
        // Generate pure glitch text
        textContent = '';
        const glitchLength = Math.floor(Math.random() * 12) + 5;
        for (let i = 0; i < glitchLength; i++) {
          textContent += glitchCharacters.charAt(Math.floor(Math.random() * glitchCharacters.length));
        }
      }
      
      const alertElem = document.createElement('div');
      alertElem.className = 'system-alert';
      
      // Randomize text sizes - more consistent
      alertElem.style.fontSize = `${0.8 + Math.random() * 1}rem`;
      
      alertElem.textContent = textContent;
      alertElem.style.position = 'absolute';
      alertElem.style.top = `${Math.random() * 100}%`;
      alertElem.style.left = `${Math.random() * 100}%`;
      alertElem.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`;
      alertElem.style.zIndex = '10';
      alertElem.style.opacity = '0';
      
      // Fade in the alert gradually
      container.appendChild(alertElem);
      
      // Gradually increase opacity for a more natural filling effect
      setTimeout(() => {
        alertElem.style.transition = 'opacity 0.5s ease';
        alertElem.style.opacity = '0.6';
      }, 50);
      
      alertCount++;
    }, 80);
    
    // Add hex dump look
    const hexDump = document.createElement('div');
    hexDump.className = 'hex-dump';
    hexDump.style.position = 'absolute';
    hexDump.style.top = '20%';
    hexDump.style.left = '10%';
    hexDump.style.color = 'var(--primary)';
    hexDump.style.fontFamily = '"Share Tech Mono", monospace';
    hexDump.style.fontSize = '0.7rem';
    hexDump.style.whiteSpace = 'pre';
    hexDump.style.zIndex = '3';
    hexDump.style.pointerEvents = 'none';
    hexDump.style.opacity = '0';
    
    // Generate hex dump content
    let hexContent = '';
    for (let i = 0; i < 20; i++) {
      let line = `0x${(i * 16).toString(16).padStart(8, '0')}: `;
      for (let j = 0; j < 16; j++) {
        line += Math.floor(Math.random() * 256).toString(16).padStart(2, '0') + ' ';
        if (j === 7) line += ' ';
      }
      line += '  ';
      for (let j = 0; j < 16; j++) {
        // Generate ASCII representation
        if (Math.random() > 0.7) {
          line += '.';
        } else {
          const code = Math.floor(Math.random() * 26) + 97;
          line += String.fromCharCode(code);
        }
      }
      hexContent += line + '\n';
    }
    
    hexDump.textContent = hexContent;
    container.appendChild(hexDump);
    
    // Fade in the hex dump
    setTimeout(() => {
      hexDump.style.transition = 'opacity 2s ease';
      hexDump.style.opacity = '0.3';
    }, 1000);
    
    // Create visual artifacts
    for (let i = 0; i < 20; i++) {
      const artifact = document.createElement('div');
      artifact.className = 'corruption-artifact';
      
      // Random properties
      const width = Math.random() * 80 + 30;
      const height = Math.random() * 6 + 1;
      
      artifact.style.position = 'absolute';
      artifact.style.width = `${width}px`;
      artifact.style.height = `${height}px`;
      artifact.style.top = `${Math.random() * 100}%`;
      artifact.style.left = `${Math.random() * 100}%`;
      artifact.style.transform = `rotate(${Math.random() * 180}deg)`;
      artifact.style.zIndex = '2';
      artifact.style.opacity = '0';
      artifact.style.pointerEvents = 'none';
      
      // Add subtle flicker effect
      artifact.style.animation = `subtle-flicker ${Math.random() * 1 + 0.5}s infinite alternate`;
      
      container.appendChild(artifact);
      
      // Fade in artifacts gradually
      setTimeout(() => {
        artifact.style.transition = 'opacity 1s ease';
        artifact.style.opacity = Math.random() * 0.2 + 0.1;
      }, Math.random() * 2000);
    }
  }
  
  // Function to display all messages in sequence
  async function displayMessages() {
    for (let i = 0; i < introMessages.length; i++) {
      currentMessageIndex = i;
      await typeMessage(introMessages[i], i);
    }
    
    // Short pause before transition
    setTimeout(() => {
      createGridTransition();
    }, 1000);
  }
  
  // Start the intro animation
  setTimeout(displayMessages, 500);
  
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

  // Matrix rain function with primary color
  function drawMatrixRain() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Primary color text
    ctx.fillStyle = "#00ff41";
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

    for (let i = 0; i < 100; i++) {
      const binaryText = document.createElement("div");
      binaryText.className = "binary-text";
      binaryText.style.color = "var(--primary)";

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
    
    // Create horizontal targeting lines
    for (let i = 0; i < 3; i++) {
      const hLine = document.createElement("div");
      hLine.className = "targeting-line targeting-line-h";
      hLine.style.backgroundColor = "var(--primary)";
      hLine.style.top = `${20 + i * 25}%`;
      hLine.style.animationDelay = `${i * 0.5}s`;
      body.appendChild(hLine);
    }
    
    // Create vertical targeting lines 
    for (let i = 0; i < 3; i++) {
      const vLine = document.createElement("div");
      vLine.className = "targeting-line targeting-line-v";
      vLine.style.backgroundColor = "var(--primary)";
      vLine.style.left = `${20 + i * 25}%`;
      vLine.style.animationDelay = `${i * 0.5}s`;
      body.appendChild(vLine);
    }
  }

  // Call targeting lines function
  createTargetingLines();
});

// Error animation sequence - maintained shaking but less intense
function startErrorSequence() {
  // Create matrix characters
  createMatrixEffect();
  
  // Add shake effects to the page - start with mild shake
  document.body.classList.add('soft-shake');
  
  // Replace warning texts with system messages
  createWarningMessages();
  
  // Screen transition effects with progressive shaking
  setTimeout(() => {
    document.body.classList.remove('soft-shake');
    document.body.classList.add('mild-shake');
    
    setTimeout(() => {
      document.body.classList.remove('mild-shake');
      document.body.classList.add('medium-shake');
      
      setTimeout(() => {
        document.body.classList.remove('medium-shake');
        document.body.classList.add('mild-shake');
        
        setTimeout(() => {
          document.body.classList.remove('mild-shake');
          
          // Close the page after a short pause
          setTimeout(() => {
            closeOrReplacePage();
          }, 500);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 2000);
}

// Create warning messages with filling background effect
function createWarningMessages() {
  const warningContainer = document.getElementById('warning-container');
  warningContainer.innerHTML = ''; // Clear existing warnings
  
  const systemMessages = [
    "SYSTEM MONITORING ACTIVE",
    "IDENTITY VERIFICATION IN PROGRESS",
    "DEFENSES ONLINE",
    "CONTROL SYSTEMS ACTIVE",
    "NETWORK SCANNING",
    "MISSION VERIFICATION",
    "LOCATION TRACKING",
    "DATA VERIFICATION",
    "SYSTEM ANALYSIS",
    "IDENTIFICATION ACTIVE",
    "SECURITY LEVEL 10",
    "CONNECTION CHECK",
    "COORDINATES VERIFIED",
    "DEFENSE GRID ONLINE",
    "SYSTEM MAINTENANCE",
    "ACCESS VERIFICATION",
    "FILE CHECKING",
    "EMERGENCY PROTOCOL ACTIVE",
    "BIOMETRIC DATA VERIFIED",
    "CONNECTION ACTIVE",
    "SYSTEM STATUS CHECK",
    "MEMORY VERIFICATION",
    "AUTHENTICATION ACTIVE",
    "FIREWALLS ONLINE",
    "KEY VERIFICATION",
    "ENCRYPTION ACTIVE",
    "SYSTEM MONITORING",
    "MISSION ACTIVE",
    "AGENCY VERIFICATION",
    "DETECTION VERIFICATION"
  ];
  
  // Code snippets
  const codeSnippets = [
    "0xFFFFFFFF CHECK",
    "SEGMENT VERIFICATION",
    "MEMORY SCAN: 0x00A2FF45",
    "STACK CHECK",
    "BUFFER VERIFICATION",
    "NULL POINTER VERIFICATION",
    "HEAP VERIFICATION",
    "VALUE CHECK",
    "FUNCTION CALL 0x8000FFFF",
    "ACCESS VERIFICATION",
    "CALL TRACE: 0xDEADBEEF",
    "[VERIFIED DATA]",
    "REGISTRY VERIFICATION",
    "FFx%$#@^&*!CHECK!^&*$#@%",
    "OS STATUS VERIFICATION"
  ];
  
  // Combined warning list
  const allWarnings = [...systemMessages, ...codeSnippets];
  
  // Create warnings positioned across the screen - gradually add more to fill the space
  const maxWarnings = 80;
  let currentWarnings = 0;
  
  function addWarning() {
    if (currentWarnings >= maxWarnings) return;
    
    const warnText = document.createElement('div');
    warnText.className = 'warning-text';
    
    // Choose random warning message
    warnText.textContent = allWarnings[Math.floor(Math.random() * allWarnings.length)];
    
    // Random position across the screen
    warnText.style.top = `${Math.random() * 100}%`;
    warnText.style.left = `${Math.random() * 100}%`;
    
    // Random rotation
    warnText.style.transform = `translateY(30px) rotate(${Math.random() * 10 - 5}deg)`;
    
    // Random animation delay for smooth filling
    warnText.style.animationDelay = `${Math.random() * 0.5}s`;
    
    // Random font size
    warnText.style.fontSize = `${0.5 + Math.random() * 1.5}rem`;
    
    // Set opacity to create depth
    warnText.style.opacity = `0`;
    
    warningContainer.appendChild(warnText);
    
    // Fade in gradually
    setTimeout(() => {
      warnText.style.transition = 'opacity 0.5s ease';
      warnText.style.opacity = Math.random() * 0.3 + 0.3;
    }, Math.random() * 200);
    
    currentWarnings++;
    
    // Schedule next warning with decreasing interval to create accelerating effect
    const nextDelay = Math.max(20, 100 - currentWarnings);
    setTimeout(addWarning, nextDelay);
  }
  
  // Start adding warnings
  addWarning();
  
  // Add hex dump background
  const hexDump = document.createElement('div');
  hexDump.className = 'hex-dump-background';
  hexDump.style.position = 'absolute';
  hexDump.style.top = '0';
  hexDump.style.left = '0';
  hexDump.style.width = '100%';
  hexDump.style.height = '100%';
  hexDump.style.fontSize = '0.6rem';
  hexDump.style.fontFamily = '"Share Tech Mono", monospace';
  hexDump.style.whiteSpace = 'pre-wrap';
  hexDump.style.zIndex = '-1';
  hexDump.style.pointerEvents = 'none';
  hexDump.style.overflow = 'hidden';
  hexDump.style.opacity = '0';
  
  // Generate hex dump content
  let hexContent = '';
  for (let i = 0; i < 500; i++) {
    let line = '';
    for (let j = 0; j < 16; j++) {
      line += Math.floor(Math.random() * 256).toString(16).padStart(2, '0') + ' ';
    }
    hexContent += line + '\n';
  }
  
  hexDump.textContent = hexContent;
  warningContainer.appendChild(hexDump);
  
  // Fade in hex dump for background filling effect
  setTimeout(() => {
    hexDump.style.transition = 'opacity 4s ease';
    hexDump.style.opacity = '0.2';
  }, 500);
  
  // Add binary elements in background - progressive filling
  function addBinaryElement(index) {
    if (index >= 100) return;
    
    const binaryElem = document.createElement('div');
    binaryElem.className = 'binary-overflow';
    
    // Generate binary string
    let binaryText = '';
    const length = Math.floor(Math.random() * 50) + 20;
    for (let j = 0; j < length; j++) {
      binaryText += Math.floor(Math.random() * 2);
    }
    
    binaryElem.textContent = binaryText;
    binaryElem.style.position = 'absolute';
    binaryElem.style.top = `${Math.random() * 100}%`;
    binaryElem.style.left = `${Math.random() * 100}%`;
    binaryElem.style.fontSize = '0.7rem';
    binaryElem.style.fontFamily = '"Share Tech Mono", monospace';
    binaryElem.style.transform = `rotate(${Math.random() * 360}deg)`;
    binaryElem.style.opacity = '0';
    binaryElem.style.zIndex = '0';
    
    warningContainer.appendChild(binaryElem);
    
    // Fade in gradually
    setTimeout(() => {
      binaryElem.style.transition = 'opacity 0.8s ease';
      binaryElem.style.opacity = Math.random() * 0.2 + 0.1;
    }, Math.random() * 500);
    
    // Schedule next binary element
    setTimeout(() => {
      addBinaryElement(index + 1);
    }, 50);
  }
  
  // Start adding binary elements
  addBinaryElement(0);
}

// Create random matrix characters
function createMatrixEffect() {
  const container = document.getElementById('matrix-container');
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()_+-=[]{}|;':\",./<>?\\";
  
  // Create matrix characters - gradually add more for filling effect
  function addMatrixChar(index) {
    if (index >= 300) return;
    
    const char = document.createElement('div');
    char.className = 'matrix-char';
    
    // Random character
    char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
    
    // Random position
    char.style.top = `${Math.random() * 100}%`;
    char.style.left = `${Math.random() * 100}%`;
    
    // Random size
    char.style.fontSize = `${1 + Math.random() * 1.5}rem`;
    
    // Random rotation
    const rotation = Math.random() * 360;
    char.style.setProperty('--rotation', `${rotation}deg`);
    
    // Random animation delay
    char.style.animationDelay = `${Math.random() * 1}s`;
    
    container.appendChild(char);
    
    // Schedule next character with decreasing interval
    const nextDelay = Math.max(10, 50 - Math.floor(index / 10));
    setTimeout(() => {
      addMatrixChar(index + 1);
    }, nextDelay);
  }
  
  // Start adding matrix characters
  addMatrixChar(0);
  
  // Continue adding characters at a controlled rate
  setTimeout(() => {
    const matrixInterval = setInterval(() => {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
      char.style.top = `${Math.random() * 100}%`;
      char.style.left = `${Math.random() * 100}%`;
      char.style.fontSize = `${1 + Math.random() * 1.5}rem`;
      
      // Random rotation
      const rotation = Math.random() * 360;
      char.style.setProperty('--rotation', `${rotation}deg`);
      
      container.appendChild(char);
      
      // Remove oldest character to limit total number
      if (container.children.length > 300) {
        container.removeChild(container.firstChild);
      }
    }, 50);
    
    // Clear interval after a set time
    setTimeout(() => {
      clearInterval(matrixInterval);
    }, 8000);
  }, 3000);
}

// Try to close or replace the page
function closeOrReplacePage() {
  // Method 1: Try to close the page
  window.close();
  
  // Method 2: If closing fails, replace with empty page
  setTimeout(() => {
    // Create empty page content
    document.body.innerHTML = '';
    document.body.style.backgroundColor = '#000';
    
    // Change title
    document.title = 'Disconnected';
    
    // Change location to about:blank if possible
    try {
      window.location.href = 'about:blank';
    } catch(e) {
      // Fallback if navigation blocked
      document.body.innerHTML = `
        <div style="position:fixed; top:0; left:0; width:100%; height:100%; 
                  background:#000; display:flex; 
                  justify-content:center; align-items:center; 
                  font-family: monospace; color:#00ff41; font-size:1.5rem;">
          CONNECTION TERMINATED
        </div>
      `;
    }
  }, 300);
}