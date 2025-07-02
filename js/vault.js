document.getElementById("vault-button").addEventListener("click", async () => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not detected. Please install it to contribute.");
    return;
  }

  try {
    const [from] = await ethereum.request({ method: "eth_requestAccounts" });
    const contributionEth = "0.1"; // You can change this to any fixed or dynamic amount
    const amount = ethers.utils.parseEther(contributionEth);

    // 30/30/30/10 split
    const portion30 = amount.mul(30).div(100);
    const portion10 = amount.sub(portion30.mul(3)); // handles precision loss

    // Vault addresses
    const VAULTS = {
      agent:   "0x7C73A8E89e3eD4EEfF86c6f14a16105415d000a6",
      earth:   "0xBda541D73DE68A6245D07C3d7cbC43024C04D0A9",
      hungry:  "0x09284d7ea8CF100417388b84DAEe603Df93C18bf",
      animals: "0x09284d7ea8CF100417388b84DAEe603Df93C18bf" // same as hungry
    };

    // Send all transactions in parallel
    const txs = [
      { to: VAULTS.agent, value: portion30.toHexString() },
      { to: VAULTS.earth, value: portion30.toHexString() },
      { to: VAULTS.hungry, value: portion30.toHexString() },
      { to: VAULTS.animals, value: portion10.toHexString() }
    ];

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

