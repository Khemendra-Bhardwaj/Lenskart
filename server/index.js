const express = require('express');
const {pool, createTables} = require('./db/db');
const app = express();

const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello, PostgreSQL with Express!');
});


// Start server
app.listen(PORT, async () => {
  await createTables()
  console.log(`Server running on http://localhost:${PORT}`);
});
