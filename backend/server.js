require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Link = require('./models/Link');
const linksRouter = require('./routes/links');

const app = express();
app.use(cors({
  origin: "*",   // Allow all for now
  methods: ["GET", "POST"],
}));
app.use(express.json());

// Health check
app.get('/healthz', (req, res) => {
  return res.json({ ok: true, version: '1.0' });
});

// API
app.use('/api/links', linksRouter);

// Redirect route (must be after /api and /code routes)
app.get('/code/:code', async (req, res) => {
  // Optional UI route - can serve frontend if hosted together, but this returns a JSON if called directly
  const link = await Link.findOne({ code: req.params.code });
  if (!link) return res.status(404).json({ error: 'Not found' });
  return res.json(link);
});

// Redirect behavior (/:code)
app.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).send('Not found');
    // Update clicks and lastClicked
    link.clicks += 1;
    link.lastClicked = new Date();
    await link.save();
    return res.redirect(302, link.target);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  })
  .catch(err => {
    console.error('DB connect error', err);
    process.exit(1);
  });
