let express = require("express");
let cors = require("cors");
let dotenv = require("dotenv");
let { AccessToken } = require("livekit-server-sdk");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;

// Health check
app.get("/", (req, res) => {
  res.send("LiveKit + Express backend running");
});

// Endpoint to get a participant token
app.post("/get-token", (req, res) => {
  const { roomName, participantName } = req.body;

  if (!roomName || !participantName) {
    return res.status(400).json({ error: "roomName and participantName required" });
  }

  // Create an access token
  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: participantName,
  });

  // Grant permissions
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();
  res.json({ token });
});

// Run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express running on http://localhost:${PORT}`));
