// server.js
require("dotenv").config(); // Load environment variables
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS to allow requests from your React app

const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

if (!YOCO_SECRET_KEY) {
  console.error("⚠️ Missing YOCO_SECRET_KEY. Set it in your .env file.");
  process.exit(1);
}

app.post("/api/capture-payment", async (req, res) => {
  const { token, amountInCents } = req.body;

  if (!token || !amountInCents) {
    return res.status(400).json({ success: false, error: "Missing token or amount" });
  }

  try {
    const response = await axios.post(
      "https://online.yoco.com/v1/charges",
      {
        token,
        amountInCents,
        currency: "ZAR",
        description: "OPPA Wall Art Purchase",
      },
      {
        headers: {
          Authorization: `Bearer ${YOCO_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("❌ Yoco capture error:", error.response ? error.response.data : error.message);
    res.status(500).json({
      success: false,
      error: error.response ? error.response.data : "Payment processing failed",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
