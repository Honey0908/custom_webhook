const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/student');
require('dotenv').config();
const studentRoutes = require('./routes/student');
const schoolRoutes = require('./routes/school');
const webhookProviderControllerRoutes = require('./routes/webhooks');
const webhookEventLogRoutes = require('./routes/webhookEventLog');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('<h1>Hello, Express.js Server!</h1>');
});

app.use('/api', studentRoutes);
app.use('/api', schoolRoutes);
app.use('/api', webhookProviderControllerRoutes);
app.use('/api', webhookEventLogRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
