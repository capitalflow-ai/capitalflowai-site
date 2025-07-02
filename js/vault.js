<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Contribute to the AI Vault</title>
</head>
<body>
  <main>
    <!-- Your vault button -->
    <button id="vault-button">Contribute to AI Vault</button>
  </main>

  <!-- Load ethers.js -->
  <script src="https://cdn.jsdelivr.net/npm/ethers/dist/ethers.min.js"></script>

  <!-- Vault interaction logic -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const vaultButton = document.getElementById("vault-button");

      if (!vaultButton) {
        console.error("Vault button not found in DOM.");
        return;
      }

      vaultButton.addEventListener("click", async () => {
        console.log("Vault button clicked.");

        if (typeof window.ethereum === "undefined") {
          alert("MetaMask not detected. Please install it to contribute.");
          return;
        }

        try {
          const [from] = await ethereum.request({ method: "eth_requestAccounts" });
          const contributionEth = "0.1";
          const amount = ethers.utils.parseEther(contributionEth);

          const portion30 = amount.mul(30).div(100);
          const portion10 = amount.sub(portion30.mul(3));

          const VAULTS = {
            agent:   "0x7C73A8E89e3eD4EEfF86c6f14a16105415d000a6",
            earth:   "0xBda541D73DE68A6245D07C3d7cbC43024C04D0A9",
            hungry:  "0x09284d7ea8CF100417388b84DAEe603Df93C18bf",
            animals: "0x09284d7ea8CF100417388b84DAEe603Df93C18bf"
          };

          const txs = [
            { to: VAULTS.agent,   value: portion30.toHexString() },
            { to: VAULTS.earth,   value: portion30.toHexString() },
            { to: VAULTS.hungry,  value: portion30.toHexString() },
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
    });
  </script>
</body>
</html>

