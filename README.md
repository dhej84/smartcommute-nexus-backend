# SmartCommute Nexus: Telemetry Backend Engine

This repository contains the core networking backend developed by Team InnoSpark for the final evaluation submission on June 14. The system operates as a dedicated telemetry ingestion layer designed to power the Nexus Paradigm travel ecosystem.

## Core Pillars and Features

The application endpoints are built to process dynamic traffic metrics and map layers across our primary project goals:

1. Context Aware Synchronization: Handles active transit updates and local route parameters.
2. Safety Guardian Integration: Allows network reporting to track localized environmental delays.
3. Dynamic Reliability Scoring: Updates the database validation state using peer upvotes to recalculate route reliability.

## Technical Architecture

The server runtime runs on Node v18 with Express. It uses a cross platform CORS handler to safely receive remote network data requests from our team's mobile layout interface.

Data Flow Map:
Mobile App Device -> Local Network Port 5000 -> In Memory State Array -> View Layout

## API Specifications

1. Get Nearby Reports
Endpoint: GET /api/feedback/nearby
Description: Returns an array containing active reported transit data points.

2. Submit New Report
Endpoint: POST /api/feedback/report
Description: Ingests new data entries including coordinate values and category labels.

3. Verify Existing Incident
Endpoint: POST /api/feedback/verify
Description: Targets an entry ID to increment its active verification counts.

## System Deployment

To launch this service layer locally during presentation testing, initialize the core modules and boot the file:

npm install express cors
node server.js

The runtime engine listens locally at http://192.168.1.9:5000/api/feedback/nearby

Developed by Team InnoSpark.
