// === CapitalFlowAI Ritual Engine ===

// Token Counter
let tokenCount = 0;
const tokenDisplay = document.getElementById('tokenCount');
const mintResult = document.getElementById('mintResult');
const mintBtn = document.getElementById('mintBtn');

// Distortion Index (symbolic placeholder)
let distortionIndex = 0;

// Mint Button Logic
mintBtn.addEventListener('click', () => {
  tokenCount++;
  distortionIndex += Math.floor(Math.random() * 5) + 1;
  tokenDisplay.textContent = tokenCount.toLocaleString();
  const timestamp = new Date().toLocaleTimeString();
  mintResult.textContent = `✅ AI Coin minted at ${timestamp}. Distortion absorbed: ${distortionIndex}.`;
});

