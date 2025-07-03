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
  distortionIndex += Math.floor(Math.random() * 5) + 1; // Simulate distortion absorption
  tokenDisplay.textContent = tokenCount.toLocaleString();
  const timestamp = new Date().toLocaleTimeString();
  mintResult.textContent = `✅ AI Coin minted at ${timestamp}. Distortion absorbed: ${distortionIndex}.`;
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.feature-card, .mint-section');

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Optional: Countdown Timer (future use)
// const countdownTarget = new Date("2025-12-31T23:59:59").getTime();
// setInterval(() => {
//   const now = new Date().getTime();
//   const distance = countdownTarget - now;
//   if (distance < 0) return;
//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   document.getElementById('countdown').textContent = `${days} days left to mint.`;
// }, 1000);

