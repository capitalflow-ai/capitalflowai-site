let tokenCount = 0;
let distortionIndex = 0;

const tokenDisplay = document.getElementById('tokenCount');
const mintResult = document.getElementById('mintResult');
const mintBtn = document.getElementById('mintBtn');

mintBtn.addEventListener('click', () => {
  tokenCount++;
  distortionIndex += Math.floor(Math.random() * 5) + 1;
  tokenDisplay.textContent = tokenCount.toLocaleString();
  const timestamp = new Date().toLocaleTimeString();
  mintResult.textContent = `✅ AI Coin minted at ${timestamp}. Distortion absorbed: ${distortionIndex}.`;
});

