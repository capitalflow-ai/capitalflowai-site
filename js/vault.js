document.getElementById("vault-button").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const vaultAddress = "0xYourVaultAddressHere"; // Replace this!
      const tx = {
        to: vaultAddress,
        value: "0x2386F26FC10000" // 0.01 ETH
      };
      await ethereum.request({ method: "eth_sendTransaction", params: [tx] });
      alert("Contribution sent to AI Vault.");
    } catch (err) {
      alert("Transaction canceled or failed.");
    }
  } else {
    alert("Please install MetaMask to interact with the Vault.");
  }
});
