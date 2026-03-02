const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const requestRoutes = require('./routes/requestRoutes');

// 1. Load env vars FIRST
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI); // ← add this

// 2. Connect to database
connectDB();

// 3. Create app
const app = express();

// 4. Middleware
app.use(cors());
app.use(express.json());

// 5. Routes (ALL routes go here, AFTER app is created)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/equipment', require('./routes/equipmentRoutes'));
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));

// 6. Test route
app.get('/', (req, res) => {
  res.json({ message: 'GearGuard API is running!' });
});

// 7. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
