// ==========================================
// SMARTCOMMUTE NEXUS: LIVE FEEDBACK BACKEND (LOCAL TEST MODE)
// ==========================================

const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS so your friend's Flutter app can communicate with this server
app.use(cors());
// Allow our server to read JSON data sent by the mobile app
app.use(express.json());

console.log("⚠️ Running in LOCAL TEST MODE. No Firebase connection required!");

// Seeded local database with an "upvotes" field added to track verifications
let localIncidentsDatabase = [
  {
    id: "mock_id_1",
    title: "Heavy Traffic near Campus Main Gate",
    category: "Transit Pulse",
    latitude: 13.0827,
    longitude: 80.2707,
    upvotes: 3,
    timestamp: new Date().toISOString()
  }
];

// ------------------------------------------
// API ENDPOINTS (ROUTES)
// ------------------------------------------

/**
 * FEATURE ENDPOINT 1: Get Active Incidents
 * Method: GET
 * Route: http://192.168.1.9:5000/api/feedback/nearby
 */
app.get('/api/feedback/nearby', (req, res) => {
  try {
    console.log(`\n📡 Flutter app is fetching nearby incidents data...`);
    return res.status(200).json(localIncidentsDatabase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * FEATURE ENDPOINT 2: Submit a Live Incident Report
 * Method: POST
 * Route: http://192.168.1.9:5000/api/feedback/report
 */
app.post('/api/feedback/report', (req, res) => {
  try {
    const { title, category, latitude, longitude } = req.body;

    if (!title || !category || !latitude || !longitude) {
      return res.status(400).json({ error: 'Missing required report attributes' });
    }

    const newReport = {
      id: "inc_" + Math.random().toString(36).substr(2, 9),
      title: title,
      category: category,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      upvotes: 0, // Fresh reports start with 0 upvotes
      timestamp: new Date().toISOString()
    };

    localIncidentsDatabase.push(newReport);
    
    console.log(`\n📥 [NEW REPORT RECEIVED]`);
    console.log(`📍 Title: ${newReport.title}`);
    console.log(`🗂️ Category: ${newReport.category}`);
    console.log(`🌐 Coordinates: ${newReport.latitude}, ${newReport.longitude}`);
    console.log(`-------------------------------------------------`);

    return res.status(201).json({ 
      message: 'Incident received by local test backend!', 
      reportId: newReport.id 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * FEATURE ENDPOINT 3: Upvote / Verify an Incident
 * Method: POST
 * Route: http://192.168.1.9:5000/api/feedback/verify
 */
app.post('/api/feedback/verify', (req, res) => {
  try {
    const { reportId } = req.body; // The Flutter app sends the ID of the clicked card

    // Search our local array for the matching incident
    const incident = localIncidentsDatabase.find(item => item.id === reportId);

    if (!incident) {
      return res.status(404).json({ error: 'Incident report not found.' });
    }

    // Increment the upvote counter by 1
    incident.upvotes += 1;

    console.log(`\n👍 [INCIDENT VERIFIED / UPVOTED]`);
    console.log(`🆔 ID: ${reportId}`);
    console.log(`📈 Title: "${incident.title}" now has ${incident.upvotes} upvotes!`);
    console.log(`-------------------------------------------------`);

    return res.status(200).json({ 
      message: 'Verification recorded successfully!', 
      updatedUpvotes: incident.upvotes 
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ------------------------------------------
// 3. START SERVER RUNTIME
// ------------------------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 SmartCommute Nexus Backend Engine Active!`);
  console.log(`📡 Listening for student data on port: ${PORT}`);
  console.log(`🔗 Local Network Base URL: http://192.168.1.9:${PORT}`);
  console.log(`=================================================`);
});