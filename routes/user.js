const express = require('express');
const router = express.Router();
const { User, Page } = require('../models');
const userList = require('../views/userList');
const userPage = require('../views/userPages');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const pages = await Page.findAll({ where: { authorId: req.params.id } });
    res.send(userPage(user, pages));
  } catch (err) {
    next(err);
  }
});
module.exports = router;
