const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Thumbs, Sunglasses } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", withAuth, (req, res) => {
  console.log(req.session);
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
      "created_at",
      // [
      //   sequelize.literal("(SELECT COUNT(*) FROM thumbs WHERE post.id = thumbs.post_id)"),
      //   "thumbs_count",
      // ],
      // [
      //   sequelize.literal("(SELECT COUNT(*) FROM sunglasses WHERE post.id = sunglasses.post_id)"),
      //   "sunglasses_count",
      // ],
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
        "created_at",
    //     [sequelize.literal("(COUNT(*) FROM thumbs WHERE post.id = thumbs.post_id)"), "thumbs_count"]
    // ],
    //    [sequelize.literal("(COUNT(*) FROM sunglasses WHERE post.id = sunglasses.post_id)"), "sunglasses_count"]
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

//creates a new post route!! separate page to make new posts!!
// router.get("/new", withAuth, (req, res) => {
//   Post.findAll({
//     //session <==================
//     where: {
//       // use the ID from the session
//       user_id: req.session.user_id
//   },
//     attributes: ["id", "title", "artist", "post_content", "created_at"],
//   })
//   // trying to get to the render part to be able to get to "add-post"
//     .then((dbPostData) => {
//       const posts = dbPostData.map((post) => post.get({ plain: true }));
//       res.render("add-post", { posts }); //<===============login stuff
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

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
      "created_at",
      // [
      //   sequelize.literal("(SELECT COUNT(*) FROM thumbs WHERE post.id = thumbs.post_id)"),
      //   "thumbs_count",
      // ],
      // [
      //   sequelize.literal("(SELECT COUNT(*) FROM sunglasses WHERE post.id = sunglasses.post_id)"),
      //   "sunglasses_count",
      // ],
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



// router.post("/new", (req, res) => {
//   // expects {title: "Taskmaster goes public!", post_content: "Crazy that no one expected it.", user_id: 1}
//   console.log(req.body),
//     Post.create({
//       ...req.body,
//       user_id: req.session.user_id
//     })
//     .then((dbPostData) => {
//       console.log(dbPostData);
//       const posts = dbPostData.map(post => post.get({ plain: true }));
//       res.render("add-post", { posts , loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;