// Manifest Reveal Trigger
const trigger = "reclaim.signal";
let phraseBuffer = "";

window.addEventListener("keydown", (e) => {
  phraseBuffer += e.key;
  if (phraseBuffer.includes(trigger)) {
    document.getElementById("veil").classList.add("unlocked");
    phraseBuffer = "";
  }
  if (phraseBuffer.length > 30) phraseBuffer = "";
});
