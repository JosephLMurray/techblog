const router = require('express').Router();

const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  // Update a post
  try {
    const updatedPost = await Post.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        content: req.body.content
      },
      {
        // Gets the post based on the id given in the request parameters
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Post deleted succesfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
