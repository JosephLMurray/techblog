const router = require('express').Router();

const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  // we want to go ahead and finishing the routing to get all the posts
  try {
    const postData = await Post.findAll({ include: Comment });
    const post = postData({ plain: true });

    res.render('posts', {
      layout: 'dashboard.hbs',
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.render('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  // for showing new posts to the user
  try {
    res.render('new-posts', {
      layout: 'dashboard.hbs',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.render('login');
  }
});

router.get('/edit/:id', withAuth, async (res, req) => {
  // To be able to find posts by primary key and render the edit post on the dashboard
  try {
    const postData = await Post.findByPk({
      where: {
        id: req.params.id
      }
    });
    const post = postData({ plain: true });

    res.render('edit-posts', {
      layout: 'dashboard.hbs',
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.render('login');
  }
});

module.exports = router;
