const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page } = require('../models');

router.get('/', (req, res) => {
  res.redirect('..');
});
router.get('/add', (req, res) => {
  res.send(addPage());
});
router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  try {
    await page.save();
    console.log(page.dataValues);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
