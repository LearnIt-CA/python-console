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

// Authorized users list - replace with your actual student list
const authorizedUsers = [
  "sean",
  "ethan",
  "dhiraj",
];

// Authentication form submission
document.getElementById("auth-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const messageElement = document.getElementById("message");

  // Check if username is in authorized list (case insensitive)
  const isAuthorized = authorizedUsers.some(
    (user) => user.toLowerCase() === username.toLowerCase()
  );

  if (isAuthorized) {
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

        // Show access granted screen after a short delay
        setTimeout(() => {
          document.getElementById("access-granted").classList.remove("hidden");
        }, 1000);
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
    }, 1000);
  }
});

// Continue button action
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
