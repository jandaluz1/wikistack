const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page, User } = require('../models');
const wikiPage = require('../views/wikipage');
const main = require('../views/main');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});
router.get('/add', (req, res) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug }
    });
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
    // res.send(`hit dynamic route at ${req.params.slug}`);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: { name: req.body.name, email: req.body.email }
    });
    page.setAuthor(user);
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
