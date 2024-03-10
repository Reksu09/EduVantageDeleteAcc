const express = require("express");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Endpoint to delete a user by ID
app.delete("/users/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    await admin.auth().deleteUser(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting user: " + error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
