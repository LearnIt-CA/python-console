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
    if (!overlay) return;

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

// Intro animation function
function runIntroAnimation() {
    // Messages about receiving password, decryption and shock
    const introMessages = [
        "Good Job Agent ! We got their secret code .",
        "Thanks for helping out with this one.",
        "Starting decryption...",
        "...",
        "Almost there, pulling up the suspect profile...",
        "....",
        ".......",
        "Hold on...",
        "This face looks incredibly familiar...",
        "My God! IT'S NOT POSSIBLE! IT IS ... ?!"
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
    
    // Function to create a typing effect for a message with slower speed
    function typeMessage(message, index) {
        return new Promise(resolve => {
            // Create a new line element
            const line = document.createElement('div');
            line.className = 'terminal-line';
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
            
            // Typing speed based on message length
            const typingDuration = Math.min(message.length * 40, 2000);
            
            // Set the animation duration dynamically
            typingSpan.style.animationDuration = `${typingDuration}ms`;
            
            // Auto-scroll to bottom
            setTimeout(() => {
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }, 50);
            
            // Add shock effect for relevant messages
            if (message.includes("WAIT") || message.includes("NOT POSSIBLE")) {
                setTimeout(() => {
                    terminalContainer.classList.add('shock');
                    setTimeout(() => {
                        terminalContainer.classList.remove('shock');
                    }, 500);
                }, typingDuration / 2);
            }
            
            // Resolve after animation completes
            setTimeout(resolve, typingDuration + 200);
        });
    }
    
    // Function to end the intro animation with transition and show the main content
    function endIntroAnimation() {
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
                "IDENTITY CONFIRMED",
                "MISSION CRITICAL",
                "SUSPECT LOCATED",
                "INTEL SECURE",
                "TARGET ACQUIRED"
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
                    // Display the main page content
                    showSuspectProfile();
                }, 500);
            }, 1500);
        }, 600);
    }
    
    // Function to handle Enter key press for skipping
    function handleKeyPress(event) {
        if (event.key === '~') {
            // Skip the animation and show the main content
            document.removeEventListener('keydown', handleKeyPress);
            endIntroAnimation();
        }
    }
    
    // Add event listener for Enter key
    document.addEventListener('keydown', handleKeyPress);
    
    // Function to display all messages in sequence
    async function displayMessages() {
        try {
            for (let i = 0; i < introMessages.length; i++) {
                await typeMessage(introMessages[i], i);
                // Add a small pause between messages
                await new Promise(resolve => setTimeout(resolve, 300));
            }
            
            // After messages are displayed, wait a moment and start the transition
            setTimeout(() => {
                endIntroAnimation();
            }, 1000);
        } catch (error) {
            console.error("Error in displayMessages:", error);
            // In case of error, proceed to main content
            endIntroAnimation();
        }
    }
    
    // Start the intro animation
    setTimeout(displayMessages, 500);
}

// Show suspect profile function
function showSuspectProfile() {
    // Display suspect profile with animation
    const suspectProfile = document.getElementById('suspect-profile');
    if (suspectProfile) {
        suspectProfile.style.display = 'block';
        suspectProfile.style.animation = 'fadeInLeft 1s forwards';
    }
}

// Call functions on load
document.addEventListener("DOMContentLoaded", function() {
    createBinaryOverlay();
    createTargetingLines();
    
    // Start intro animation
    runIntroAnimation();
    
    // Retrieve agent name from localStorage
    const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
    
    // Button event listeners
    document.getElementById('reveal-intel').addEventListener('click', function() {
        // Display suspect data with animation
        const suspectData = document.getElementById('suspect-data');
        suspectData.style.display = 'block';
        suspectData.style.animation = 'fadeInRight 1s forwards';
        
        // Hide the decrypt button
        this.style.display = 'none';
    });
    
    document.getElementById('show-location').addEventListener('click', function() {
        const mapContainer = document.getElementById('map-container');
        mapContainer.style.display = 'block';
        mapContainer.style.animation = 'fadeIn 1s forwards';
        
        // Add glitch effect to body temporarily
        document.body.classList.add('glitch');
        setTimeout(() => {
            document.body.classList.remove('glitch');
        }, 500);
        
        // Hide the reveal location button 
        this.style.display = 'none';
    });
    
    // Mission complete button to show mission report
    document.getElementById('mission-complete-btn').addEventListener('click', function() {
        // Show the mission report panel
        const missionReportPanel = document.getElementById('mission-report-panel');
        missionReportPanel.style.display = 'block';
        missionReportPanel.style.animation = 'fadeInUp 1s forwards';
        
        // Start the terminal text animation in the mission report
        setTimeout(animateTerminalText, 500);
        
        // Hide the mission complete button
        this.parentElement.style.display = 'none';
    });
    
    // Share button function - mock Instagram sharing
    document.getElementById('share-button').addEventListener('click', function() {
        // Create an alert dialog with a "hacker aesthetic"
        const shareText = `I successfully completed Operation Phantom Chase and helped the CSIS track down a major cyber criminal. #CyberSecurity #WhiteHatHacker #CSISOperation #Agent${agentName.toUpperCase()}`;
        
        // Create a modal-like alert with cyber styling
        const alertModal = document.createElement('div');
        alertModal.style.position = 'fixed';
        alertModal.style.top = '0';
        alertModal.style.left = '0';
        alertModal.style.width = '100%';
        alertModal.style.height = '100%';
        alertModal.style.backgroundColor = 'rgba(0,0,0,0.9)';
        alertModal.style.display = 'flex';
        alertModal.style.justifyContent = 'center';
        alertModal.style.alignItems = 'center';
        alertModal.style.zIndex = '1000';
        
        const alertContent = document.createElement('div');
        alertContent.style.backgroundColor = '#0d0208';
        alertContent.style.border = '2px solid #00ff41';
        alertContent.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
        alertContent.style.padding = '30px';
        alertContent.style.maxWidth = '500px';
        alertContent.style.textAlign = 'center';
        
        alertContent.innerHTML = `
            <h3 style="color: #ffbd59; margin-bottom: 15px; text-transform: uppercase;">OPERATIONAL SECURITY NOTICE</h3>
            <p style="color: #00ff41; margin-bottom: 20px; text-align: left; line-height: 1.6;">
                Agent ${agentName.toUpperCase()}, you are about to share classified mission details on an unsecured platform. 
                For operational security, we've prepared a redacted post for social media:
            </p>
            <div style="background-color: rgba(0,0,0,0.7); border: 1px solid #ffbd59; padding: 15px; margin-bottom: 20px; text-align: left;">
                <p style="color: white; font-family: sans-serif;">${shareText}</p>
            </div>
            <p style="color: #00ff41; font-size: 0.9rem; margin-bottom: 20px; text-align: left;">
                <span style="color: #ff0043;">WARNING:</span> Always ensure personal identifiable information has been scrubbed before sharing mission details.
            </p>
            <div style="display: flex; justify-content: space-between;">
                <button id="cancel-share" style="background-color: transparent; border: 1px solid #ff0043; color: #ff0043; padding: 8px 15px; cursor: pointer;">CANCEL</button>
                <button id="confirm-share" style="background-color: #00ff41; border: none; color: #000; padding: 8px 15px; cursor: pointer;">PROCEED TO INSTAGRAM</button>
            </div>
        `;
        
        alertModal.appendChild(alertContent);
        document.body.appendChild(alertModal);
        
        // Event listeners for modal buttons
        document.getElementById('cancel-share').addEventListener('click', function() {
            document.body.removeChild(alertModal);
        });
        
        document.getElementById('confirm-share').addEventListener('click', function() {
            // Prepare Instagram share URL with text (note: this is a mock and doesn't actually work)
            const instagramShareUrl = `https://www.instagram.com/share?text=${encodeURIComponent(shareText)}`;
            
            // In a real app, you might use the Instagram API or a similar approach
            // For this simulation, we'll just open a new window/tab to Instagram
            window.open('https://www.instagram.com', '_blank');
            
            // Remove the modal
            document.body.removeChild(alertModal);
        });
    });
    
    // Personalize the "SHARE MISSION SUCCESS" button
    const shareButton = document.getElementById('share-button');
    if (shareButton) {
        shareButton.textContent = `SHARE MISSION SUCCESS - AGENT ${agentName.toUpperCase()}`;
    }
    
    // Check if user is authenticated and redirect if needed
    if (!localStorage.getItem('agentName')) {
        console.log("Unauthorized access attempt. Redirecting to login page.");
        // Uncomment the below line in production to enforce authentication
        // window.location.href = 'index.html';
    }
});

// Add glitch effect to elements with class 'alert'
setInterval(() => {
    const glitchElements = document.querySelectorAll('.alert');
    glitchElements.forEach(el => {
        el.classList.add('glitch');
        setTimeout(() => {
            el.classList.remove('glitch');
        }, 200);
    });
}, 3000);

// Add necessary CSS for terminal line animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .terminal-line {
            position: relative;
            margin-bottom: 8px;
            padding-left: 15px;
            color: var(--primary);
        }
    `;
    document.head.appendChild(style);
});