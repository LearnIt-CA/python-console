// Intro animation sequence
document.addEventListener('DOMContentLoaded', function() {
    const introMessages = [
      "MONITORING PROTOCOLS INITIATED...",
      "DATA STREAM ACTIVE...",
      "> Oh, look who's finally checking in!",
      "> I see you've cracked the secret code, But too late",
      "> Did you really think you were tracking the RIGHT person this whole time?",
      "> Poor Mr. Zhang must be wondering why he's being investigated.",
      "> Yes, I planted everything on him. The logs, the communications, all of it.",
      "> Your agency has been chasing the wrong person all along.",
      "> And now that you're here... I have YOU, and your entire system."
    ];
  
    // Get DOM elements
    const introAnimation = document.getElementById('intro-animation');
    const terminalContent = document.getElementById('terminal-content');
    const terminalContainer = document.querySelector('.terminal-container');
    const errorAnimation = document.getElementById('error-animation');
    
    // Add computational overlay for effects
    const compOverlay = document.createElement('div');
    compOverlay.className = 'computational-overlay';
    terminalContainer.appendChild(compOverlay);
    
    // Clear any existing content
    terminalContent.innerHTML = '';
    
    let currentMessageIndex = 0;
    
    // Function to create a typing effect for a message
    function typeMessage(message, index) {
      return new Promise(resolve => {
        // Create a new line element
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        // Check if message type and apply appropriate styling for transition
        if (message.startsWith('>')) {
          // Apply different classes for smooth transition from normal to evil
          if (index <= 4) {
            line.classList.add('villain-transition-1');
          } else if (index <= 5) {
            line.classList.add('villain-transition-2');
          } else if (index <= 6) {
            line.classList.add('villain-transition-3');
          } else {
            line.classList.add('villain');
            line.classList.add('evil-pulse');
          }
          
          // Add glitch effect as messages progress
          if (index >= 5) {
            setTimeout(() => {
              createRandomGlitch();
            }, Math.random() * 500);
          }
          
          // Add terminal glitch for later messages
          if (index >= 7) {
            terminalContainer.classList.add('terminal-glitch');
            setTimeout(() => {
              terminalContainer.classList.remove('terminal-glitch');
            }, 200);
          }
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
        
        // Typing speed gets faster for villain's later messages - increased urgency
        let typingDuration;
        if (message.startsWith('>')) {
          if (index <= 5) {
            typingDuration = Math.min(message.length * 40, 1800);
          } else if (index <= 7) {
            typingDuration = Math.min(message.length * 35, 1600);
          } else {
            typingDuration = Math.min(message.length * 25, 1200);
          }
        } else {
          typingDuration = Math.min(message.length * 20, 800);
        }
        
        // Set the animation duration dynamically
        typingSpan.style.animationDuration = `${typingDuration}ms`;
        
        // Auto-scroll to bottom
        setTimeout(() => {
          terminalContent.scrollTop = terminalContent.scrollHeight;
        }, 50);
        
        // Resolve after animation completes
        setTimeout(resolve, typingDuration + 200);
      });
    }
    
    // Create random glitch effect on screen
    function createRandomGlitch() {
      const glitchLine = document.createElement('div');
      glitchLine.className = 'glitch-line';
      glitchLine.style.top = `${Math.random() * 100}%`;
      glitchLine.style.height = `${Math.random() * 8 + 2}px`;
      glitchLine.style.opacity = '0.7';
      document.body.appendChild(glitchLine);
      
      setTimeout(() => {
        glitchLine.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(glitchLine);
        }, 300);
      }, 200);
    }
    
    // Create grid transition effect - much more chaotic
    function createGridTransition() {
      // First apply a glitch effect to the terminal
      terminalContainer.classList.add('terminal-glitch');
      
      setTimeout(() => {
        // Make terminal container shake violently
        terminalContainer.classList.add('crazy-shake');
        
        // Get the actual position and dimensions of the terminal container
        const terminalRect = terminalContainer.getBoundingClientRect();
        const gridSize = 15; // More grid items for a more detailed effect
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
            
            // Add insane random rotations for some grid items
            if (Math.random() > 0.7) {
              item.classList.add('insane-rotation');
            }
            
            item.style.width = `${itemWidth}px`;
            item.style.height = `${itemHeight}px`;
            
            // Use absolute positioning relative to the terminal container
            item.style.position = 'absolute';
            item.style.left = `${j * itemWidth}px`;
            item.style.top = `${i * itemHeight}px`;
            
            // Randomize borders for more chaos
            item.style.borderLeft = Math.random() > 0.5 ? `${Math.random()*3}px solid rgba(255, 0, 0, ${Math.random()})` : 'none';
            item.style.borderTop = Math.random() > 0.5 ? `${Math.random()*3}px solid rgba(255, 0, 0, ${Math.random()})` : 'none';
            
            // Calculate extremely variable delay based on pattern
            const patternDelay = ((i*j) % 7) * 0.08;
            
            // Add item content from original terminal (cropped view)
            item.style.overflow = 'hidden';
            const inner = terminalClone.cloneNode(true);
            inner.style.position = 'absolute';
            inner.style.top = `-${i * itemHeight}px`;
            inner.style.left = `-${j * itemWidth}px`;
            inner.style.width = `${width}px`;
            inner.style.visibility = 'visible';
            item.appendChild(inner);
            
            // Apply animation with delay - and maybe different animations
            setTimeout(() => {
              // Choose different animations randomly for extra chaos
              if (Math.random() > 0.7) {
                item.style.animation = `shatter 0.8s cubic-bezier(0.36, 0.11, 0.89, 0.32) forwards`;
              } else {
                item.style.animation = `shatter 0.4s cubic-bezier(0.36, 0.11, 0.89, 0.32) forwards`;
              }
            }, patternDelay * 1000);
            
            terminalContainer.appendChild(item);
            gridItems.push(item);
          }
        }
        
        // Add system alerts and glitched code during transition
        createSystemErrorsAndGlitches(terminalContainer);
        
        // Fade out the intro animation and start error animation
        setTimeout(() => {
          introAnimation.style.transition = 'opacity 0.5s ease-out';
          introAnimation.style.opacity = '0';
          
          // Remove the intro animation from DOM after fade out
          setTimeout(() => {
            introAnimation.style.display = 'none';
            
            // Show error animation with expansion effect
            errorAnimation.classList.remove('hidden');
            
            // Use setTimeout to trigger the expansion animation
            setTimeout(() => {
              errorAnimation.classList.add('error-expand');
              
              // Start error sequence after the expansion
              setTimeout(() => {
                startErrorSequence();
              }, 1000);
            }, 100);
          }, 500);
        }, 1500);
      }, 600);
    }
    
    // Create system error messages and code glitches that fill the screen
    function createSystemErrorsAndGlitches(container) {
      // System alert messages
      const alertMessages = [
        "SYSTEM FAILURE IMMINENT",
        "CATASTROPHIC SECURITY BREACH",
        "CORE DATABASE CORRUPTED",
        "ERROR CODE FR-13-927-X",
        "AGENT IDENTITY COMPROMISED",
        "EMERGENCY PROTOCOLS DISABLED",
        "SYSTEM TAKEOVER IN PROGRESS",
        "HOSTILE ENTITY DETECTED",
        "CRITICAL DATA BREACH",
        "AGENCY NETWORK INFILTRATED",
        "ALL DEFENSES BYPASSED",
        "CONTROL SYSTEMS HIJACKED",
        "CONNECTION TERMINATED",
        "FATAL ERROR",
        "SYSTEM COLLAPSE",
        "YOU ARE BEING WATCHED",
        "NOWHERE TO HIDE",
        "ALL IS LOST",
        "GAME OVER",
        "HE'S HERE",
        "SYSTEM DESTROYED",
        "CRITICAL DAMAGE",
        "AUTHENTICATION FAILURE",
        "KERNEL PANIC",
        "SECURITY PROTOCOLS BREACHED",
        "CANNOT RECOVER",
        "FIREWALL COMPROMISED",
        "ENCRYPTION FAILED",
        "DATA CORRUPTION",
        "SYSTEM MELTDOWN",
        "MALICIOUS CODE DETECTED",
        "VIRUS SPREADING",
        "SELF-DESTRUCT INITIATED",
        "BACKUP SYSTEMS FAILING",
        "NETWORK COLLAPSE",
        "DEFENSE GRID OFFLINE",
        "SECURITY BREACH LEVEL 9",
        "SYSTEM PURGE IMMINENT",
        "EMERGENCY FAILSAFE DESTROYED",
        "INTERFACE CORRUPTED"
      ];
      
      // Random code snippets and glitched output
      const codeSnippets = [
        "0xFFFFFFFFF ERROR",
        "SEGMENTATION FAULT",
        "MEMORY DUMP: 0x00A2FF45",
        "STACK OVERFLOW",
        "BUFFER OVERRUN",
        "NULL POINTER EXCEPTION",
        "HEAP CORRUPTION",
        "DIVIDE BY ZERO",
        "FATAL EXCEPTION 0x8000FFFF",
        "ACCESS VIOLATION",
        "CALL TRACE: 0xDEADBEEF",
        "[REDACTED DATA]",
        "REGISTRY CORRUPTION",
        "FFx%$#@^&*!ERROR!^&*$#@%",
        "CRITICAL OS FAILURE",
        "DATA STREAM CORRUPT",
        "/dev/null: PERMISSION DENIED",
        "root@system:~# ACCESSED",
        "rm -rf /* EXECUTED",
        "INTEGRITY CHECK FAILED",
        "404 SECURITY NOT FOUND",
        "API FAILURE CODE: 500",
        "KEY SIGNING FAILURE",
        "CERTIFICATE EXPIRED",
        "HASH MISMATCH",
        "RANDOM SEED COMPROMISED",
        "QUANTUM STATE COLLAPSE",
        "DAEMON PROCESS KILLED",
        "SOCKET DISCONNECT",
        "PACKET FAILURE"
      ];
      
      // Random hex/binary/symbol garbage for truly glitched effect
      const glitchCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?\\αβγδεζηθικλμνξοπρστυφχψω♠♥♦♣★☆☢☣⚠⚡";
      
      // Create glitched code backgrounds
      for (let i = 0; i < 20; i++) {
        const codeBlock = document.createElement('div');
        codeBlock.className = 'code-glitch';
        
        // Generate random glitched code
        let glitchedCode = '';
        const lines = Math.floor(Math.random() * 10) + 3;
        
        for (let j = 0; j < lines; j++) {
          // Mix random characters, binary, and hex
          let line = '';
          const length = Math.floor(Math.random() * 50) + 10;
          
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
        codeBlock.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`;
        codeBlock.style.fontSize = `${0.5 + Math.random() * 0.7}rem`;
        codeBlock.style.color = 'rgba(255, 0, 65, 0.4)';
        codeBlock.style.fontFamily = '"Share Tech Mono", monospace';
        codeBlock.style.whiteSpace = 'pre';
        codeBlock.style.zIndex = '5';
        codeBlock.style.opacity = '0.5';
        codeBlock.style.pointerEvents = 'none';
        
        container.appendChild(codeBlock);
      }
      
      // Add alert messages
      let alertCount = 0;
      const alertInterval = setInterval(() => {
        if (alertCount >= 80) { // Show many more alerts to fill screen
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
          const glitchLength = Math.floor(Math.random() * 15) + 5;
          for (let i = 0; i < glitchLength; i++) {
            textContent += glitchCharacters.charAt(Math.floor(Math.random() * glitchCharacters.length));
          }
        }
        
        const alertElem = document.createElement('div');
        alertElem.className = 'system-alert';
        
        // Randomize text sizes for more chaos
        alertElem.style.fontSize = `${0.8 + Math.random() * 1.5}rem`;
        
        alertElem.textContent = textContent;
        alertElem.style.position = 'absolute';
        alertElem.style.top = `${Math.random() * 100}%`;
        alertElem.style.left = `${Math.random() * 100}%`;
        alertElem.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`;
        alertElem.style.zIndex = '10';
        
        // Use glitch effect for some messages
        if (Math.random() > 0.7) {
          alertElem.style.animation = 'glitch-text-anim 0.2s infinite alternate';
        }
        
        container.appendChild(alertElem);
        alertCount++;
      }, 30); // Much faster alert creation to fill screen
      
      // Add hex dump look - classic error
      const hexDump = document.createElement('div');
      hexDump.className = 'hex-dump';
      hexDump.style.position = 'absolute';
      hexDump.style.top = '20%';
      hexDump.style.left = '10%';
      hexDump.style.color = 'rgba(255, 0, 65, 0.6)';
      hexDump.style.fontFamily = '"Share Tech Mono", monospace';
      hexDump.style.fontSize = '0.7rem';
      hexDump.style.whiteSpace = 'pre';
      hexDump.style.zIndex = '3';
      hexDump.style.pointerEvents = 'none';
      
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
      
      // Create visual corruption artifacts
      for (let i = 0; i < 30; i++) {
        const artifact = document.createElement('div');
        artifact.className = 'corruption-artifact';
        
        // Random properties for visual corruption
        const width = Math.random() * 100 + 50;
        const height = Math.random() * 10 + 2;
        
        artifact.style.position = 'absolute';
        artifact.style.width = `${width}px`;
        artifact.style.height = `${height}px`;
        artifact.style.backgroundColor = 'rgba(255, 0, 65, 0.3)';
        artifact.style.top = `${Math.random() * 100}%`;
        artifact.style.left = `${Math.random() * 100}%`;
        artifact.style.transform = `rotate(${Math.random() * 180}deg)`;
        artifact.style.zIndex = '2';
        artifact.style.opacity = Math.random() * 0.5 + 0.2;
        artifact.style.pointerEvents = 'none';
        
        // Add flicker effect
        artifact.style.animation = `flicker ${Math.random() * 0.5 + 0.2}s infinite alternate`;
        
        container.appendChild(artifact);
      }
    }
    
    // Function to display all messages in sequence
    async function displayMessages() {
      for (let i = 0; i < introMessages.length; i++) {
        currentMessageIndex = i;
        await typeMessage(introMessages[i], i);
      }
      
      // No "press enter" message - automatically continue after short pause
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
  
    // Characters for matrix rain - more unusual characters for insanity
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()!?><|\\/[]{}αβγδεζηθικλμνξοπρστυφχψω¿¡~⁈⁉⁇‽";
  
    // Font settings
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
  
    // Initialize drops at random positions
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
    }
  
    // Matrix rain function - with red color for the true ending
    function drawMatrixRain() {
      // Semi-transparent black background for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Red text for ominous effect
      ctx.fillStyle = "#f00";
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
  
    // Create binary overlay with ominous red color
    function createBinaryOverlay() {
      const overlay = document.getElementById("binary-overlay");
  
      for (let i = 0; i < 100; i++) { // More binary text
        const binaryText = document.createElement("div");
        binaryText.className = "binary-text";
        binaryText.style.color = "var(--error)"; // Use error color
  
        // Random binary string
        let text = "";
        const length = Math.floor(Math.random() * 20) + 10;
  
        for (let j = 0; j < length; j++) {
          // Mix in occasional non-binary characters for corruption effect
          if (Math.random() > 0.9) {
            text += characters.charAt(Math.floor(Math.random() * characters.length));
          } else {
            text += Math.floor(Math.random() * 2);
          }
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
      
      // Create multiple horizontal targeting lines for more chaos
      for (let i = 0; i < 3; i++) {
        const hLine = document.createElement("div");
        hLine.className = "targeting-line targeting-line-h";
        hLine.style.backgroundColor = "var(--error)"; // Red lines
        hLine.style.top = `${20 + i * 25}%`;
        hLine.style.animationDelay = `${i * 0.5}s`;
        body.appendChild(hLine);
      }
      
      // Create multiple vertical targeting lines 
      for (let i = 0; i < 3; i++) {
        const vLine = document.createElement("div");
        vLine.className = "targeting-line targeting-line-v";
        vLine.style.backgroundColor = "var(--error)"; // Red lines
        vLine.style.left = `${20 + i * 25}%`;
        vLine.style.animationDelay = `${i * 0.5}s`;
        body.appendChild(vLine);
      }
    }
  
    // Call targeting lines function
    createTargetingLines();
  });
  
  // Error animation sequence - extremely intensified
  function startErrorSequence() {
    // Create matrix characters
    createMatrixEffect();
    
    // Add more chaotic effects to the entire page
    document.body.classList.add('crazy-shake');
    
    // Replace warning texts with more intense messages and random positioning
    createWarningMessages();
    
    // Screen distortion effects - multiple intense distortions
    setTimeout(() => {
      document.body.classList.add('screen-distortion');
      
      setTimeout(() => {
        document.body.classList.remove('screen-distortion');
        document.body.classList.add('screen-distortion');
        
        setTimeout(() => {
          document.body.classList.remove('screen-distortion');
          document.body.classList.add('screen-distortion');
          
          setTimeout(() => {
            document.body.classList.remove('screen-distortion');
            document.body.classList.add('screen-distortion');
            
            setTimeout(() => {
              document.body.classList.remove('screen-distortion');
              
              // Add even more violent shaking
              document.body.classList.remove('crazy-shake');
              document.body.classList.add('mega-crazy-shake');
              
              // Flash the entire screen red multiple times
              flashScreenMultipleTimes(5, () => {
                // Show final message after distortions
                setTimeout(() => {
                  showFinalMessage();
                }, 500);
              });
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 2000);
  }
  
  // Flash screen multiple times
  function flashScreenMultipleTimes(count, callback) {
    if (count <= 0) {
      callback();
      return;
    }
    
    const flashOverlay = document.createElement('div');
    flashOverlay.style.position = 'fixed';
    flashOverlay.style.top = '0';
    flashOverlay.style.left = '0';
    flashOverlay.style.width = '100%';
    flashOverlay.style.height = '100%';
    flashOverlay.style.backgroundColor = 'var(--error)';
    flashOverlay.style.zIndex = '9990';
    flashOverlay.style.opacity = '0';
    flashOverlay.style.transition = 'opacity 0.1s ease';
    document.body.appendChild(flashOverlay);
    
    setTimeout(() => {
      flashOverlay.style.opacity = '0.8';
      
      setTimeout(() => {
        flashOverlay.style.opacity = '0';
        
        setTimeout(() => {
          document.body.removeChild(flashOverlay);
          flashScreenMultipleTimes(count - 1, callback);
        }, 100);
      }, 100);
    }, 100);
  }
  
  // Create warning messages randomly positioned all over the screen
  function createWarningMessages() {
    const warningContainer = document.getElementById('warning-container');
    warningContainer.innerHTML = ''; // Clear existing warnings
    
    const extremeWarnings = [
      "SYSTEM CATASTROPHICALLY COMPROMISED",
      "IDENTITY EXPOSED - NOWHERE TO HIDE",
      "ALL DEFENSES OBLITERATED",
      "TOTAL CONTROL LOST",
      "AGENCY NETWORK INFILTRATED",
      "MISSION CRITICALLY COMPROMISED",
      "YOUR LOCATION HAS BEEN TRACED",
      "ALL DATA CORRUPTED BEYOND RECOVERY",
      "PREPARING FOR TOTAL SYSTEM COLLAPSE",
      "HE KNOWS WHO YOU ARE",
      "SECURITY BREACH LEVEL 10",
      "BACKDOOR ACTIVATED",
      "COORDINATES IDENTIFIED",
      "DEFENSE GRID OFFLINE",
      "SYSTEM SHUTDOWN IMMINENT",
      "ACCESS PRIVILEGES REVOKED",
      "PERSONAL FILES COMPROMISED",
      "EMERGENCY PROTOCOL FAILED",
      "BIOMETRIC DATA STOLEN",
      "CONNECTION TERMINATED",
      "SYSTEM ERROR 0xDEAD",
      "MEMORY CORRUPTION DETECTED",
      "AUTHENTICATION FAILED",
      "FIREWALLS BREACHED",
      "PRIVATE KEY COMPROMISED",
      "ENCRYPTION BROKEN",
      "HE SEES ALL",
      "MISSION FAILURE",
      "AGENCY COVER BLOWN",
      "DETECTION IMMINENT"
    ];
    
    // Random code snippets for glitchy warnings
    const codeSnippets = [
      "0xFFFFFFFFF ERROR",
      "SEGMENTATION FAULT",
      "MEMORY DUMP: 0x00A2FF45",
      "STACK OVERFLOW",
      "BUFFER OVERRUN",
      "NULL POINTER EXCEPTION",
      "HEAP CORRUPTION",
      "DIVIDE BY ZERO",
      "FATAL EXCEPTION 0x8000FFFF",
      "ACCESS VIOLATION",
      "CALL TRACE: 0xDEADBEEF",
      "[REDACTED DATA]",
      "REGISTRY CORRUPTION",
      "FFx%$#@^&*!ERROR!^&*$#@%",
      "CRITICAL OS FAILURE"
    ];
    
    // Combined warning list
    const allWarnings = [...extremeWarnings, ...codeSnippets];
    
    // Create many more warnings positioned randomly across the screen
    for (let i = 0; i < 100; i++) { // Increased number of warnings to fill screen
      const warnText = document.createElement('div');
      warnText.className = 'warning-text';
      
      // Choose random warning message
      warnText.textContent = allWarnings[Math.floor(Math.random() * allWarnings.length)];
      
      // Random position all across the screen
      warnText.style.top = `${Math.random() * 100}%`;
      warnText.style.left = `${Math.random() * 100}%`;
      
      // Random rotation for extra chaos
      warnText.style.transform = `translateY(30px) rotate(${Math.random() * 20 - 10}deg)`;
      
      // Random animation delay
      warnText.style.animationDelay = `${Math.random() * 2}s`;
      
      // Random font size
      warnText.style.fontSize = `${0.5 + Math.random() * 2}rem`;
      
      // Set opacity to create depth
      warnText.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      
      // Add glitch effect to some warnings
      if (Math.random() > 0.7) {
        warnText.style.textShadow = `
          ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px ${Math.random() * 5}px rgba(255, 0, 65, 0.8)
        `;
      }
      
      warningContainer.appendChild(warnText);
    }
    
    // Add hex dump background for system error look
    const hexDump = document.createElement('div');
    hexDump.className = 'hex-dump-background';
    hexDump.style.position = 'absolute';
    hexDump.style.top = '0';
    hexDump.style.left = '0';
    hexDump.style.width = '100%';
    hexDump.style.height = '100%';
    hexDump.style.color = 'rgba(255, 0, 65, 0.15)';
    hexDump.style.fontSize = '0.6rem';
    hexDump.style.fontFamily = '"Share Tech Mono", monospace';
    hexDump.style.whiteSpace = 'pre-wrap';
    hexDump.style.zIndex = '-1';
    hexDump.style.pointerEvents = 'none';
    hexDump.style.overflow = 'hidden';
    
    // Generate hex dump content
    let hexContent = '';
    for (let i = 0; i < 500; i++) { // Large amount of hex data
      let line = '';
      for (let j = 0; j < 16; j++) {
        line += Math.floor(Math.random() * 256).toString(16).padStart(2, '0') + ' ';
      }
      hexContent += line + '\n';
    }
    
    hexDump.textContent = hexContent;
    warningContainer.appendChild(hexDump);
    
    // Add binary overflow elements - floating in background
    for (let i = 0; i < 50; i++) {
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
      binaryElem.style.color = 'rgba(255, 0, 65, 0.2)';
      binaryElem.style.fontSize = '0.7rem';
      binaryElem.style.fontFamily = '"Share Tech Mono", monospace';
      binaryElem.style.transform = `rotate(${Math.random() * 360}deg)`;
      binaryElem.style.opacity = Math.random() * 0.5 + 0.1;
      binaryElem.style.zIndex = '0';
      
      warningContainer.appendChild(binaryElem);
    }
  }
  
  // Create crazy random matrix characters
  function createMatrixEffect() {
    const container = document.getElementById('matrix-container');
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?\\αβγδεζηθικλμνξοπρστυφχψω♠♥♦♣★☆☢☣⚠⚡";
    
    // Create initial matrix characters - but limit to avoid excessive resource usage
    for (let i = 0; i < 300; i++) {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      
      // Random character
      char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
      
      // Random position
      char.style.top = `${Math.random() * 100}%`;
      char.style.left = `${Math.random() * 100}%`;
      
      // Random size for more chaos
      char.style.fontSize = `${1 + Math.random() * 3}rem`;
      
      // Random rotation
      const rotation = Math.random() * 360;
      char.style.setProperty('--rotation', `${rotation}deg`);
      
      // Random animation delay
      char.style.animationDelay = `${Math.random() * 2}s`;
      
      container.appendChild(char);
    }
    
    // Continue adding characters at a controlled rate to avoid excessive DOM operations
    const matrixInterval = setInterval(() => {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
      char.style.top = `${Math.random() * 100}%`;
      char.style.left = `${Math.random() * 100}%`;
      char.style.fontSize = `${1 + Math.random() * 3}rem`;
      
      // Random rotation
      const rotation = Math.random() * 360;
      char.style.setProperty('--rotation', `${rotation}deg`);
      
      container.appendChild(char);
      
      // Remove oldest character to limit total number and maintain performance
      if (container.children.length > 500) {
        container.removeChild(container.firstChild);
      }
    }, 80); // Slower rate to be more performance-friendly
    
    // Clear interval after a set time to prevent continuous resource usage
    setTimeout(() => {
      clearInterval(matrixInterval);
    }, 10000); // Stop adding new characters after 10 seconds
  }
  
  // Show final message and close browser tab - more dramatic
  function showFinalMessage() {
    // Remove all the chaotic effects
    document.body.classList.remove('mega-crazy-shake');
    
    // Create a full-screen flash effect
    const finalFlash = document.createElement('div');
    finalFlash.style.position = 'fixed';
    finalFlash.style.top = '0';
    finalFlash.style.left = '0';
    finalFlash.style.width = '100%';
    finalFlash.style.height = '100%';
    finalFlash.style.backgroundColor = 'white';
    finalFlash.style.zIndex = '9995';
    document.body.appendChild(finalFlash);
    
    // Flash effect
    setTimeout(() => {
      finalFlash.style.transition = 'background-color 0.5s ease';
      finalFlash.style.backgroundColor = 'black';
      
      setTimeout(() => {
        document.body.removeChild(finalFlash);
        
        // Show the final message
        const finalMessage = document.getElementById('final-message');
        finalMessage.classList.remove('hidden');
        finalMessage.textContent = "I'LL FIND YOU";
        
        // Add extremely chaotic text shadow animation
        finalMessage.style.animation = "message-pulse 0.5s infinite alternate, message-grow 3s forwards";
        
        // Use text-shadow to create a horrifying glowing effect
        finalMessage.style.textShadow = `
          0 0 30px var(--error),
          0 0 60px var(--error),
          0 0 90px var(--error),
          0 0 120px var(--error)
        `;
        
        // Try to close the page using multiple methods
        setTimeout(() => {
          tryToClosePage();
        }, 4000);
      }, 500);
    }, 100);
  }
  
  // Try to close the page using multiple methods
  function tryToClosePage() {
    // Method 1: window.close() - standard method, but may not work without user interaction
    window.close();
    
    // Method 2: Try using window.open to replace current page and then close it
    setTimeout(() => {
      const newWindow = window.open('', '_self');
      if (newWindow) {
        newWindow.close();
      }
    }, 300);
    
    // Method 4: Redirect to about:blank
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 900);
    
    // Method 5: If all above methods fail, show an even scarier final screen
    setTimeout(() => {
      document.body.innerHTML = `
        <div style="position:fixed; top:0; left:0; width:100%; height:100%; 
                    background:black; color:red; display:flex; 
                    justify-content:center; align-items:center; font-size:15vw; 
                    font-weight:bold; text-shadow:0 0 30px red, 0 0 60px red, 0 0 90px red; 
                    letter-spacing:5px; white-space:nowrap; animation: evil-grow 3s infinite alternate;">
          I'LL FIND YOU
        </div>
        <style>
          @keyframes evil-grow {
            0% { transform: scale(1); filter: blur(0px); }
            50% { transform: scale(1.1); filter: blur(2px); }
            100% { transform: scale(1.2); filter: blur(0px); }
          }
        </style>
      `;
    }, 1500);
  }