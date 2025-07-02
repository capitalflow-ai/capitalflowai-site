import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

// === Vault Addresses ===
const VAULTS = {
  agent:   "0x7C73A8E89e3eD4EEfF86c6f14a16105415d000a6",
  earth:   "0xBda541D73DE68A6245D07C3d7cbC43024C04D0A9",
  hungry:  "0x09284d7ea8CF100417388b84DAEe603Df93C18bf",
  animals: "0x09284d7ea8CF100417388b84DAEe603Df93C18bf"
};

const vaultButton = document.getElementById("vault-button");
const previewModal = document.getElementById("preview-modal");
const confirmSend = document.getElementById("confirm-send");
const cancelSend = document.getElementById("cancel-send");
const statusMsg = document.getElementById("status-msg");

let fromAddress = null;
let txs = [];

vaultButton.addEventListener("click", async () => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not detected.");
    return;
  }

  try {
    [fromAddress] = await ethereum.request({ method: "eth_requestAccounts" });
    const amount = ethers.utils.parseEther("0.1");
    const p30 = amount.mul(30).div(100);
    const p10 = amount.sub(p30.mul(3));

    txs = [
      { label: "Agent",   to: VAULTS.agent,   value: p30 },
      { label: "Earth",   to: VAULTS.earth,   value: p30 },
      { label: "Hungry",  to: VAULTS.hungry,  value: p30 },
      { label: "Animals", to: VAULTS.animals, value: p10 }
    ];

    // Populate modal preview
    document.getElementById("wallet-address").textContent = fromAddress;
    document.getElementById("eth-amount").textContent = ethers.utils.formatEther(amount);
    const ul = document.getElementById("vault-breakdown");
    ul.innerHTML = "";
    txs.forEach(tx => {
      const li = document.createElement("li");
      li.textContent = `${tx.label}: ${ethers.utils.formatEther(tx.value)} ETH`;
      ul.appendChild(li);
    });

    previewModal.style.display = "block";

  } catch (err) {
    console.error("Error during preview:", err);
    alert("Failed to connect wallet.");
  }
});

cancelSend.addEventListener("click", () => {
  previewModal.style.display = "none";
  txs = [];
});

confirmSend.addEventListener("click", async () => {
  previewModal.style.display = "none";
  statusMsg.textContent = "Sending transactions...";
  try {
    for (const tx of txs) {
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [{ from: fromAddress, to: tx.to, value: tx.value.toHexString() }]
      });
      statusMsg.textContent = `Sent to ${tx.label} ✅`;
    }

    statusMsg.textContent = "All contributions complete.";
  } catch (err) {
    console.error("Transaction error:", err);
    statusMsg.textContent = "Something went wrong.";
  }
});

