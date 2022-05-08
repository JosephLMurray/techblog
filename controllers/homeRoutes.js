const router = require('express').Router();
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  // get all posts for the homepage
  try {
    const postData = await Post.findAll({
      include: Comment
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  // get a single post
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: Comment
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // login
});

router.get('/signup', (req, res) => {
  // signup
});

module.exports = router;
