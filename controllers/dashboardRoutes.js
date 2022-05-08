const router = require('express').Router();

const { Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  // we want to go ahead and finishing the routing to get all the posts
  try {
    const postData = await Post.findAll({ include: Comment });
    res.status(200).json(postData);
  } catch (err) {
    res.json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  // for showing new posts to the user
});

router.get('/edit/:id', withAuth, async (res, req) => {
  // To be able to find posts by primary key and render the edit post on the dashboard
});

module.exports = router;
