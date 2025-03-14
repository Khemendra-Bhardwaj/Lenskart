const express = require('express');
const pool = require('./db/db');
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
  console.log(`Server running on http://localhost:${PORT}`);

  await createTables(); 

});
