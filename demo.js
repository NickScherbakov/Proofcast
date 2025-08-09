// demo.js
const axios = require("axios");

const CORE_URL   = "http://localhost:4000";
const VERIFY_URL = "http://localhost:4001";

async function generateReceipt() {
  const payload = {
    method: "GET",
    path:   "/status",
    params: { verbose: true }
  };

  const res = await axios.post(`${CORE_URL}/api/v1/receipt`, payload);
  return res.data;  // { receipt: "...", metadata: {...} }
}

async function verifyReceipt(receipt) {
  const res = await axios.post(`${VERIFY_URL}/api/v1/verify`, { receipt });
  return res.data;  // { valid: true, details: {...} }
}

(async () => {
  console.log("1) Generating receipt...");
  const { receipt, metadata } = await generateReceipt();
  console.log("Receipt:", receipt);
  console.log("Metadata:", metadata);

  console.log("\n2) Verifying receipt...");
  const result = await verifyReceipt(receipt);
  console.log("Valid?", result.valid);
  console.dir(result.details, { depth: null });
})();
