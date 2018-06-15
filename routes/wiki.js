const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<h1>Wiki/</h1>`);
});
router.get('/add', (req, res) => {
  res.send('<h1>Wiki/add</h1>');
});
router.post('/', (req, res) => {
  res.send(req.body);
});

module.exports = router;
