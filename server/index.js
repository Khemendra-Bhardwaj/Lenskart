const express = require('express');
const {pool, createTables, userPool} = require('./db/db');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());

app.use(cors());

// Test route


app.get('/health', async (req, res) => {
  try {
    const dbStatus = await checkDatabaseHealth();
    res.status(200).json({
      status: 'ok',
      databases: dbStatus
    });
    console.log("All DBs Up")
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed'
    });
  }
});


app.get('/getSomething', (req,res)=>{
  res.send("You Got Something !") 
})


// app.get('/users', async (req, res) => {
//   try {
//     const { rows } = await userPool.query('SELECT id, name, email, created_at FROM users');
//     res.json(rows);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.post('/users', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const { rows } = await userPool.query(
//       'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
//       [name, email, password]
//     );
//     res.status(201).json(rows[0]);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });


app.get('/', (req, res) => {
  res.send('Hello, PostgreSQL with Express!');
});



// Start server
app.listen(PORT, async () => {
  await createTables()
  console.log(`Server running on http://localhost:${PORT}`);
});
