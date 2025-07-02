<script src="https://cdn.jsdelivr.net/npm/ethers/dist/ethers.min.js"></script>
<script>
  document.getElementById("vault-button").addEventListener("click", async () => {
    // Ensure MetaMask is available
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask not detected. Please install it to contribute.");
      return;
    }

    try {
      // Connect MetaMask and get user address
      const [from] = await ethereum.request({ method: "eth_requestAccounts" });

      // Define contribution amount
      const contributionEth = "0.1"; // Change this to vary the contribution
      const amount = ethers.utils.parseEther(contributionEth);

      // Calculate portion splits
      const portion30 = amount.mul(30).div(100);
      const portion10 = amount.sub(portion30.mul(3)); // Remaining for precision correction

      // Vault destination addresses
      const VAULTS = {
        agent:   "0x7C73A8E89e3eD4EEfF86c6f14a16105415d000a6",
        earth:   "0xBda541D73DE68A6245D07C3d7cbC43024C04D0A9",
        hungry:  "0x09284d7ea8CF100417388b84DAEe603Df93C18bf",
        animals: "0x09284d7ea8CF100417388b84DAEe603Df93C18bf" // same as hungry
      };

      // Prepare transaction array
      const txs = [
        { to: VAULTS.agent,   value: portion30.toHexString() },
        { to: VAULTS.earth,   value: portion30.toHexString() },
        { to: VAULTS.hungry,  value: portion30.toHexString() },
        { to: VAULTS.animals, value: portion10.toHexString() }
      ];

      // Send each transaction sequentially
      for (const tx of txs) {
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{ from, ...tx }]
        });
      }

      alert("Contribution split across all vaults successfully.");

    } catch (err) {
      console.error("Split transaction failed:", err);
      alert("Something went wrong. Please check MetaMask and try again.");
    }
  });
</script>

