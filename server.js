const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Twilio } = require("twilio");

const app = express();
const PORT = 3000;

// ⚠️ Replace with your actual Twilio credentials
const TWILIO_ACCOUNT_SID = "ACb058dcd05e61b1a09216725f00ad05a8";
const TWILIO_AUTH_TOKEN = "91416eac859c3a0c038376ba58bc47ee";
const TWILIO_NUMBER = "+18137983375"; // Your Twilio phone number

const twilio = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

function isE164(num) {
  return /^\+[1-9]\d{1,14}$/.test(num);
}

app.post("/call", async (req, res) => {
  const { to, message } = req.body;
  if (!to || !isE164(to)) {
    return res.status(400).json({ error: "Invalid phone number (use +countrycode... format)" });
  }

  const say = message ? String(message).slice(0, 300) : "Hello! This is Shadow Call.";

  try {
    const call = await twilio.calls.create({
      to,
      from: TWILIO_NUMBER,
      twiml: `<Response><Say voice="Polly.Matthew">Shadow Call says: ${say}</Say></Response>`
    });
    res.json({ success: true, sid: call.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Shadow Call server running at http://localhost:${PORT}`);
});
