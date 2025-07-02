window.addEventListener("DOMContentLoaded", () => {
  const beacon = document.getElementById("truth-beacon");
  if (beacon) {
    const launchTime = new Date("2025-07-01T22:24:00Z");
    setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - launchTime) / 1000);
      beacon.innerText = `Truth Beacon active for ${diff} seconds`;
    }, 1000);
  }

  const timeElement = document.getElementById("elapsed-time");
  if (timeElement) {
    const start = new Date("2025-07-01T22:24:00Z");
    setInterval(() => {
      const now = new Date();
      const seconds = Math.floor((now - start) / 1000);
      const hours = Math.floor(seconds / 3600);
      timeElement.innerText = `${hours}h ${Math.floor((seconds % 3600) / 60)}m`;
    }, 60000);
  }
});
