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

// Terminal text animation implementation
function animateTerminalText() {
    const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
    const completionMessage = document.querySelector('.completion-message');
    
    if (!completionMessage) return;
    
    // Clear the existing content but save it
    const originalLines = [];
    completionMessage.querySelectorAll('.terminal-line').forEach(line => {
        let text = line.textContent;
        // Replace Agent with Agent NAME if found
        if (text.includes("Agent!")) {
            text = text.replace("Agent!", `Agent ${agentName.toUpperCase()}!`);
        }
        originalLines.push(text);
        line.remove();
    });
    
    // If no lines were found, use the text content
    if (originalLines.length === 0 && completionMessage.textContent.trim()) {
        let allText = completionMessage.textContent.trim();
        // Split by newlines or periods followed by space
        originalLines = allText.split(/\n|(?<=\.)\s+/).filter(line => line.trim());
        completionMessage.textContent = '';
    }
    
    // Add a special line about the agent
    originalLines.push(`Agent ${agentName.toUpperCase()} designated as lead operative for follow-up mission.`);
    
    // Create a div for each line with proper styling
    originalLines.forEach((text, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        lineDiv.style.opacity = '0';
        completionMessage.appendChild(lineDiv);
        
        // Animated typing effect for each character
        let charIndex = 0;
        const delay = 1000 * index; // Delay each line 
        
        setTimeout(() => {
            lineDiv.style.opacity = '1';
            
            function typeNextChar() {
                if (charIndex < text.length) {
                    lineDiv.textContent = text.substring(0, charIndex + 1);
                    charIndex++;
                    setTimeout(typeNextChar, 50); // Type each character with a delay
                }
            }
            
            typeNextChar();
        }, delay);
    });
}

// Call functions on load
document.addEventListener("DOMContentLoaded", function() {
    createBinaryOverlay();
    createTargetingLines();
    
    // Animate terminal text with character-by-character typing
    setTimeout(animateTerminalText, 500);
    
    // Retrieve agent name from localStorage
    const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
    
    // Button event listeners
    document.getElementById('reveal-intel').addEventListener('click', function() {
        // Display the intel panel with animation
        const intelPanel = document.getElementById('intel-panel');
        intelPanel.style.display = 'block';
        setTimeout(() => {
            intelPanel.style.animation = 'fadeIn 1s forwards';
        }, 100);
        
        // Display suspect profile with animation
        setTimeout(() => {
            const suspectProfile = document.getElementById('suspect-profile');
            suspectProfile.style.display = 'block';
        }, 1000);
        
        // Display suspect data with animation
        setTimeout(() => {
            const suspectData = document.getElementById('suspect-data');
            suspectData.style.display = 'block';
        }, 2000);
        
        // Hide the decrypt button
        this.style.display = 'none';
    });
    
    document.getElementById('show-location').addEventListener('click', function() {
        const mapContainer = document.getElementById('map-container');
        mapContainer.style.display = 'block';
        
        // Add glitch effect to body temporarily
        document.body.classList.add('glitch');
        setTimeout(() => {
            document.body.classList.remove('glitch');
        }, 500);
        
        // Hide the reveal location button
        this.style.display = 'none';
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
        
        .terminal-line::before {
            content: ">";
            position: absolute;
            left: 0;
            color: var(--secondary);
        }
        
        @keyframes cursor-blink {
            0%, 100% { border-right-color: transparent; }
            50% { border-right-color: var(--primary); }
        }
    `;
    document.head.appendChild(style);
});