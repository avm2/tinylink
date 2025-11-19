const express = require('express');
const router = express.Router();
const Link = require('../models/Link');
const validUrl = require('valid-url');

// Create link
// POST /api/links
// Body: { code?: string, target: string }
router.post('/', async (req, res) => {
  try {
    const { code, target } = req.body;
    if (!target || !validUrl.isUri(target)) {
      return res.status(400).json({ error: 'Invalid or missing target URL' });
    }

    let finalCode = code;
    if (finalCode) {
      const match = /^[A-Za-z0-9]{6,8}$/.test(finalCode);
      if (!match) return res.status(400).json({ error: 'Custom code must match [A-Za-z0-9]{6,8}' });
      const exists = await Link.findOne({ code: finalCode });
      if (exists) return res.status(409).json({ error: 'Code already exists' });
    } else {
      // generate random 6 char alnum; if collision, retry a few times
      const gen = () => Math.random().toString(36).slice(2, 8).replace(/[^A-Za-z0-9]/g, '').slice(0,6);
      let tries = 0;
      do {
        finalCode = gen();
        tries++;
      } while (await Link.findOne({ code: finalCode }) && tries < 5);
      // if still exists, append random digits
      if (await Link.findOne({ code: finalCode })) finalCode += Math.floor(Math.random()*900 + 100).toString().slice(0, Math.max(0, 8-finalCode.length));
    }

    const link = new Link({ code: finalCode, target });
    await link.save();
    return res.status(201).json({ code: link.code, target: link.target, clicks: link.clicks, createdAt: link.createdAt });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// List all links
// GET /api/links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    return res.json(links);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get stats for one code
// GET /api/links/:code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).json({ error: 'Not found' });
    return res.json(link);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete link
// DELETE /api/links/:code
router.delete('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const removed = await Link.findOneAndDelete({ code });
    if (!removed) return res.status(404).json({ error: 'Not found' });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
