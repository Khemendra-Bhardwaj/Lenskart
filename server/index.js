const express = require('express');
// const {pool, createTables, userPool} = require('./db/init_db');
const { User} = require("./db/userDB/models/User")
const {checkDatabaseHealth} = require("./db/healthCheck")
const initializeDatabase = require("./db/init_tables")
// const {User}
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());

app.use(cors());


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


app.get('/users/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findByEmail(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/', (req, res) => {
  res.send('Hello, PostgreSQL with Express!');
});



app.listen(PORT, async () => {
  try {
    await initializeDatabase(); // Initialize the database
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1); // Exit the process if initialization fails
  }
});
