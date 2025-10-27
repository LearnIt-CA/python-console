document.addEventListener('DOMContentLoaded', function () {
  const introMessages = [
    "Congrats on acing the training! I knew I didn't misjudge you.",
    "We've successfully cornered the Phantom.",
    "But he's locked his system behind an encrypted firewall.",
    "Your mission: break the firewall before he escapes.",
    "Good luck, Agent."
  ];

  const introAnimation = document.getElementById('intro-animation');
  const terminalContent = document.getElementById('terminal-content');
  const terminalContainer = document.querySelector('.terminal-container');

  const compOverlay = document.createElement('div');
  compOverlay.className = 'computational-overlay';
  terminalContainer.appendChild(compOverlay);

  terminalContent.innerHTML = '';

  let isComplete = false;

  function showBreakingNews() {
    return new Promise(resolve => {
      const newsAlert = document.createElement('div');
      newsAlert.className = 'breaking-news-alert';
      newsAlert.innerHTML = `
        <div class="breaking-news-content">
          <div class="breaking-news-flash">⚠️ Emergency ⚠️</div>
          <div class="breaking-news-text">URGENT SYSTEM ALERT DETECTED</div>
          <div class="breaking-news-text">PHANTOM ACTIVITY CONFIRMED</div>
          <div class="breaking-news-text">IMMEDIATE ACTION REQUIRED</div>
        </div>
      `;
      document.body.appendChild(newsAlert);

      setTimeout(() => {
        newsAlert.style.animation = 'breakingNewsExit 0.5s ease-out forwards';
        setTimeout(() => {
          newsAlert.remove();
          resolve();
        }, 500);
      }, 2500);
    });
  }

  function typeMessage(message) {
    return new Promise(resolve => {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      line.style.animation = 'none';
      line.style.opacity = '1';

      if (message === "") {
        line.innerHTML = "&nbsp;";
        terminalContent.appendChild(line);
        resolve();
        return;
      }

      const typingSpan = document.createElement('span');
      typingSpan.className = 'typing';
      typingSpan.textContent = message;
      line.appendChild(typingSpan);

      terminalContent.appendChild(line);

      const typingDuration = Math.min(message.length * 50, 2000);
      typingSpan.style.animationDuration = `${typingDuration}ms`;

      setTimeout(() => {
        terminalContent.scrollTop = terminalContent.scrollHeight;
      }, 50);

      setTimeout(resolve, typingDuration + 400);
    });
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && isComplete) {
      createGridTransition();
    }
  }

  document.addEventListener('keydown', handleKeyPress);

  function createGridTransition() {
    document.removeEventListener('keydown', handleKeyPress);
    terminalContainer.classList.add('terminal-glitch');

    setTimeout(() => {
      const terminalRect = terminalContainer.getBoundingClientRect();
      const gridSize = 10;
      const width = terminalRect.width;
      const height = terminalRect.height;
      const itemWidth = width / gridSize;
      const itemHeight = height / gridSize;

      const terminalClone = terminalContent.cloneNode(true);

      terminalContent.style.visibility = 'hidden';
      const cursorLine = document.querySelector('.cursor-line');
      if (cursorLine) {
        cursorLine.style.visibility = 'hidden';
      }

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const item = document.createElement('div');
          item.className = 'grid-item';
          item.style.width = `${itemWidth}px`;
          item.style.height = `${itemHeight}px`;
          item.style.position = 'absolute';
          item.style.left = `${j * itemWidth}px`;
          item.style.top = `${i * itemHeight}px`;
          item.style.borderLeft = i % 2 === 0 ? '1px solid rgba(0, 255, 65, 0.3)' : 'none';
          item.style.borderTop = j % 2 === 0 ? '1px solid rgba(0, 255, 65, 0.3)' : 'none';

          const patternDelay = ((i + j) % 4) * 0.1;

          item.style.overflow = 'hidden';
          const inner = terminalClone.cloneNode(true);
          inner.style.position = 'absolute';
          inner.style.top = `-${i * itemHeight}px`;
          inner.style.left = `-${j * itemWidth}px`;
          inner.style.width = `${width}px`;
          inner.style.visibility = 'visible';
          item.appendChild(inner);

          setTimeout(() => {
            item.style.animation = `shatter 0.6s cubic-bezier(0.36, 0.11, 0.89, 0.32) forwards`;
          }, patternDelay * 1000);

          terminalContainer.appendChild(item);
        }
      }

      const alertMessages = [
        "FIREWALL DETECTED",
        "ANALYZING ENCRYPTION",
        "BRUTE-FORCE INITIATED",
        "SCANNING KEYSPACE",
        "ESTABLISHING BACKDOOR",
        "DECRYPTION IN PROGRESS"
      ];

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

      setTimeout(() => {
        introAnimation.style.transition = 'opacity 0.5s ease-out';
        introAnimation.style.opacity = '0';

        setTimeout(() => {
          introAnimation.style.display = 'none';
        }, 500);
      }, 1500);
    }, 600);
  }

  async function displayMessages() {
    await showBreakingNews();

    for (let i = 0; i < introMessages.length; i++) {
      await typeMessage(introMessages[i]);
    }

    isComplete = true;

    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line prompt-line';
    promptLine.innerHTML = "<span class='blink'>Press Enter to continue...</span>";
    terminalContent.appendChild(promptLine);
  }

  setTimeout(displayMessages, 500);
});

function initTerminalEffect() {
  const terminalTexts = document.querySelectorAll(".terminal-text");
  const taskItems = document.querySelectorAll(".task-list li");

  [...terminalTexts, ...taskItems].forEach(el => {
    el.style.opacity = "0";
    el.style.display = "block";
  });

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

  setTimeout(() => {
    revealElements(terminalTexts, 400);

    setTimeout(() => {
      revealElements(taskItems, 300);
    }, terminalTexts.length * 400 + 500);
  }, 800);
}

document.addEventListener("DOMContentLoaded", initTerminalEffect);

document.addEventListener("DOMContentLoaded", function () {
  const consoleInput = document.getElementById("console-input");
  const consoleLogs = document.getElementById("console-logs");

  const hackingMessages = [
    "Scanning firewall encryption...",
    "Monitoring Phantom's system activity...",
    "Analyzing keyspace patterns...",
    "Secure connection maintained...",
    "Intercepting encrypted data packets...",
    "Checking for security backdoors...",
    "Testing brute-force efficiency...",
    "Bypassing secondary firewall...",
    "Decrypting passcode algorithms...",
    "Routing through secure proxy servers...",
    "Detecting vulnerability patterns...",
    "System integrity check: PASSED",
    "Phantom's firewall status: ACTIVE",
    "PIN cracking algorithm: READY",
    "Backdoor detection: IN PROGRESS",
    "Encryption level: MEDIUM",
    "Establishing secure tunnel...",
    "Memory allocation: OPTIMAL",
    "Checking for countermeasures...",
    "Analyzing passcode entropy...",
    "Quantum decryption: STANDBY",
    "Server response: 200 OK",
    "Brute-force module: LOADED",
    "Executing systematic enumeration",
    "System load: 37% - within parameters"
  ];

  function addConsoleLog(message, type = "") {
    const logElement = document.createElement("div");
    logElement.className = `console-log ${type}`;
    logElement.textContent = message;
    consoleLogs.appendChild(logElement);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;
  }

  function toggleCodeSection(sectionId) {
    const section = document.getElementById(`${sectionId}-section`);
    if (!section) {
      addConsoleLog(`Error: Section "${sectionId}" not found.`, "error");
      return false;
    }

    if (section.classList.contains("visible")) {
      section.classList.remove("visible");
      addConsoleLog(`${sectionId.toUpperCase()} code archived.`, "system");
      return false;
    } else {
      section.classList.add("visible");
      addConsoleLog(`${sectionId.toUpperCase()} code deployed.`, "system");
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return true;
    }
  }

  function showHelp() {
    const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
    addConsoleLog(`=== COMMANDS FOR AGENT ${agentName.toUpperCase()} ===`, "system");
    addConsoleLog("/help - Show this help message", "system");
    addConsoleLog("/testing - Toggle testing Python code section", "system");
    addConsoleLog("/official - Toggle official mission Python code", "system");
    addConsoleLog("/clear - Clear console logs", "system");
    addConsoleLog("/submit code - Submit your solution with verification code", "system");
    addConsoleLog("========================", "system");
  }


  function processCommand(rawCommand) {
    const fullCommand = rawCommand.trim();
    if (!fullCommand) {
      return;
    }
    const parts = fullCommand.split(' ');
    const baseCommand = parts[0];

    addConsoleLog("> " + fullCommand, "system");

    switch (baseCommand.toLowerCase()) {
      case "/help":
        showHelp();
        break;
      case "/testing":
        toggleCodeSection("training");
        break;
      case "/official":
        toggleCodeSection("official");
        break;
      case "/clear":
        while (consoleLogs.children.length > 0) {
          consoleLogs.removeChild(consoleLogs.lastChild);
        }
        addConsoleLog("Console cleared.", "system");
        break;
      case "/submit": {
        const verificationCode = parts[1];
        if (!verificationCode) {
          addConsoleLog("Error: Missing verification code. Usage: /submit code", "error");
          return;
        }

        if (verificationCode !== "102825" && verificationCode !== "TRUTH!") {
          addConsoleLog(`Error: Invalid verification code: ${verificationCode}`, "error");
          return;
        }

        addConsoleLog(`Submitting solution with verification code: ${verificationCode}...`, "success");

        if (verificationCode === "102825") {
           window.location.href = "mission-complete.html";
         } else if (verificationCode === "TRUTH!") {
          window.location.href = "true-ending.html";
        }
    
        break;
      }
      default:
        if (baseCommand.startsWith("/")) {
          addConsoleLog(`Unknown command: ${fullCommand}. Type /help for available commands.`, "error");
        } else {
          addConsoleLog(`Command execution failed: ${fullCommand}`, "error");
        }
    }
  }

  consoleInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = consoleInput.value;
      if (command.trim() !== "") {
        processCommand(command);
        consoleInput.value = "";
      }
    }
  });

  function simulateSystemMessages() {
    if (consoleLogs.children.length < 15) {
      const messageElement = document.createElement("div");
      messageElement.className = "console-log";

      const message = hackingMessages[Math.floor(Math.random() * hackingMessages.length)];
      messageElement.textContent = message;

      if (Math.random() > 0.7) {
        const status = Math.random() > 0.5 ? "OK" : "PENDING";
        const code = Math.floor(Math.random() * 999);
        messageElement.textContent += ` [${status}:${code}]`;
      }

      consoleLogs.appendChild(messageElement);
      consoleLogs.scrollTop = consoleLogs.scrollHeight;
    }

    setTimeout(simulateSystemMessages, Math.random() * 4000 + 2000);
  }

  const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
  addConsoleLog(`Terminal v3.1.4 initialized for Agent ${agentName.toUpperCase()}`, "system");
  addConsoleLog("Firewall breach protocol loaded", "system");
  addConsoleLog("Type /help for available commands", "system");

  setTimeout(simulateSystemMessages, 2000);

  document.querySelectorAll(".code-section").forEach(section => {
    section.classList.remove("visible");
  });

  const envLink = document.querySelector('.env-link');
  if (envLink) {
    envLink.addEventListener('click', function (e) {
      e.preventDefault();
      addConsoleLog("Opening secure Python environment...", "system");
      window.open("https://livecodes.io/", "_blank", "noopener");
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const agentName = localStorage.getItem('agentName') || 'UNKNOWN';
  const directiveElement = document.querySelector('.mission-directive .terminal-text');
  if (directiveElement && directiveElement.textContent.includes("Agent,")) {
    directiveElement.textContent = directiveElement.textContent.replace(
      "Agent,",
      `Agent ${agentName.toUpperCase()},`
    );
  }
});

const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()!?><|\\/[]{}";
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);

const drops = [];
for (let i = 0; i < columns; i++) {
  drops[i] = Math.floor((Math.random() * canvas.height) / fontSize);
}

function drawMatrixRain() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f8";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );

    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrixRain, 50);

function createBinaryOverlay() {
  const overlay = document.getElementById("binary-overlay");

  for (let i = 0; i < 50; i++) {
    const binaryText = document.createElement("div");
    binaryText.className = "binary-text";

    let text = "";
    const length = Math.floor(Math.random() * 20) + 10;

    for (let j = 0; j < length; j++) {
      text += Math.floor(Math.random() * 2);
    }

    binaryText.textContent = text;

    const left = Math.random() * 100;
    const top = Math.random() * 100;

    binaryText.style.left = `${left}%`;
    binaryText.style.top = `${top}%`;

    overlay.appendChild(binaryText);
  }
}

createBinaryOverlay();

function createTargetingLines() {
  const body = document.body;

  const hLine = document.createElement("div");
  hLine.className = "targeting-line targeting-line-h";
  body.appendChild(hLine);

  const vLine = document.createElement("div");
  vLine.className = "targeting-line targeting-line-v";
  body.appendChild(vLine);
}

createTargetingLines();

document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target');
    const codeBlock = document.getElementById(targetId);
    if (!codeBlock) {
      this.textContent = "ERROR";
      this.classList.add("error");
      setTimeout(() => {
        this.textContent = "COPY CODE";
        this.classList.remove("error");
      }, 2000);
      return;
    }
    const textToCopy = codeBlock.textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.textContent = "COPIED!";
      this.classList.add("copied");

      codeBlock.classList.add("flash");
      setTimeout(() => {
        codeBlock.classList.remove("flash");
      }, 300);

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