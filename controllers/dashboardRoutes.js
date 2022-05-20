const router = require('express').Router();

const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  // we want to go ahead and finishing the routing to get all the posts
  try {
    const postData = await Post.findAll({ include: Comment });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts
    });
  } catch (err) {
    res.render('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  // for showing new posts to the user
  try {
    res.render('new-posts', {
      layout: 'dashboard',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.render('login');
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  // To be able to find posts by primary key and render the edit post on the dashboard
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['content']
        }
      ]
    });

    const post = postData.get({ plain: true });

    res.render('edit-posts', {
      layout: 'dashboard',
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(null);
  }
});

module.exports = router;
