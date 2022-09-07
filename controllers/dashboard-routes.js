const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require('../utils/auth');

//get all posts from the dashboard
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    // session check
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      "id",
      "title",
      "artist",
      "post_content",
      "created_at"
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbPostData) => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("dashboard", { posts , loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    where: {
      id: req.params.id,
    },
    attributes: [
        "id",
        "post_content",
        "artist",
        "title",
        "created_at"
     ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        res.render("edit-post", {
          post,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/editcomments/:id", withAuth, (req, res) => {
  Comment.findByPk()
    .then((dbCommentData) => {
      if (dbCommentData) {
        const comment = dbCommentData.get({ plain: true });

        res.render("edit-comment", {
          comment,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/new", withAuth, (req, res) => {
  Post.findAll({
    // session check
    
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      "id",
      "title",
      "artist",
      "post_content",
      "created_at"
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbPostData) => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("add-post", { posts , loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;