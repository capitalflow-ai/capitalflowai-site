const trigger = "reclaim.signal";
let buffer = "";

window.addEventListener("keydown", (e) => {
  buffer += e.key;
  if (buffer.includes(trigger)) {
    document.getElementById("veil").classList.add("unlocked");
    buffer = "";
  }
  if (buffer.length > 30) buffer = "";
});
