require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Process Yoco payment
app.post("/api/process-payment", async (req, res) => {
  const { token, amount } = req.body; // Receive token from frontend

  if (!token || !amount) {
    return res.status(400).json({ error: "Missing token or amount" });
  }

  try {
    const response = await axios.post(
      "https://online.yoco.com/v1/charges/",
      {
        token: token,
        amountInCents: amount, // Amount received from frontend
        currency: "ZAR",
      },
      {
        headers: {
          "X-Auth-Secret-Key": process.env.YOCO_SECRET_KEY, // Use environment variable for security
        },
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("Payment error:", error.response.data);
    res.status(500).json({ error: error.response.data });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
