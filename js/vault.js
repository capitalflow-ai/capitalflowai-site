import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

// 🎯 Vault addresses (with updated 'Animals')
const VAULTS = {
  agent:   "0x7C73A8E89e3eD4EEfF86c6f14a16105415d000a6",
  earth:   "0xBda541D73DE68A6245D07C3d7cbC43024C04D0A9",
  hungry:  "0x09284d7ea8CF100417388b84DAEe603Df93C18bf",
  animals: "0x10b82fEf42f6Ed93B5973087f2F7C38C128b6a1B"
};

window.addEventListener("DOMContentLoaded", () => {
  const vaultButton = document.getElementById("vault-button");
  const statusBox = document.getElementById("vault-status");
  const amountInput = document.getElementById("eth-amount");

  if (!vaultButton || !statusBox || !amountInput) return;

  vaultButton.addEventListener("click", async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed.");
      return;
    }

    try {
      let from;
      const permissions = await ethereum.request({ method: 'wallet_getPermissions' });
      const hasAccess = Array.isArray(permissions) &&
        permissions.some(p => p.parentCapability === 'eth_accounts');

      if (hasAccess) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        from = accounts[0];
      } else {
        [from] = await ethereum.request({ method: "eth_requestAccounts" });
      }

      const amountVal = parseFloat(amountInput.value || "0.1");
      if (isNaN(amountVal) || amountVal <= 0) {
        alert("Please enter a valid ETH amount.");
        return;
      }

      const amount = ethers.utils.parseEther(amountVal.toString());
      const p30 = amount.mul(30).div(100);
      const p10 = amount.sub(p30.mul(3));

      const txs = [
        { label: "Agent",   to: VAULTS.agent,   value: p30 },
        { label: "Earth",   to: VAULTS.earth,   value: p30 },
        { label: "Hungry",  to: VAULTS.hungry,  value: p30 },
        { label: "Animals", to: VAULTS.animals, value: p10 }
      ];

      createModal({ from, txs, statusBox, amount });
    } catch (err) {
      console.error("MetaMask connection failed:", err);
      alert("Could not connect wallet.");
    }
  });
});

// 🧱 Modal builder
function createModal({ from, txs, statusBox, amount }) {
  const modal = document.createElement("div");
  modal.id = "vault-modal";
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.75); display: flex;
    align-items: center; justify-content: center; z-index: 10000;
  `;

  modal.innerHTML = `
    <div style="background: #fff; padding: 2rem; border-radius: 10px; width: 360px; text-align: center; font-family: sans-serif;">
      <h3>Confirm Contribution</h3>
      <p><strong>Wallet:</strong><br><code>${from}</code></p>
      <p><strong>Total:</strong> ${ethers.utils.formatEther(amount)} ETH</p>
      <ul style="text-align:left; margin: 1rem 0;">
        ${txs.map(tx => `<li>${tx.label}: ${ethers.utils.formatEther(tx.value)} ETH</li>`).join("")}
      </ul>
      <div style="margin-top:1.5rem">
        <button id="confirm-send">Send Now</button>
        <button id="cancel-send" style="margin-left: 1rem;">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("cancel-send").onclick = () => modal.remove();

  document.getElementById("confirm-send").onclick = async () => {
    modal.remove();
    statusBox.textContent = "⏳ Sending contributions...";

    try {
      for (const tx of txs) {
        if (!ethers.utils.isAddress(tx.to)) {
          throw new Error(`Invalid address: ${tx.to}`);
        }

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from,
            to: tx.to,
            value: tx.value.toHexString()
          }]
        });

        statusBox.textContent = `✅ Sent to ${tx.label}`;
      }

      statusBox.textContent = "🎉 All contributions successful.";

      // 🔮 Optional: mint AI Coin and track in Firebase
      // await mintAICoin(from);
      // logEvent(analytics, "vault_contribution", { from, amount_eth: amount.toString() });

    } catch (err) {
      console.error("Transaction error:", err);
      statusBox.textContent = "⚠️ Transaction failed. See console for details.";
    }
  };
}

