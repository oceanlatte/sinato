const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const sequelize = require("../../config/connection");
const { Post, User, Comment, Thumbs } = require("../../models");

//get all posts
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: [
      "id",
      "title",
      "artist",
      "post_content",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM thumbs WHERE post.id = thumbs.post_id)"
        ),
        "thumbs_count",
      ],
    ],
    order: [["created_at", "DESC"]],
    include: [
      //includes the Comment model
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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "artist",
      "post_content",
      "created_at",
      [
        sequelize.literal("(COUNT(*) FROM thumbs WHERE post.id = thumbs.post_id)"),
        "thumbs_count",
      ],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // expects {title: "Taskmaster goes public!", post_content: "Crazy that no one expected it.", user_id: 1}
  console.log(req.body),
    //console.log(req.session.user_id);
    Post.create({
      ...req.body,
      user_id: req.session.user_id
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put("/thumbs", (req, res) => {
  // for thumbs up
  Thumbs.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  }).then(() => {
    return Post.findAll({
      where: {
        id: req.body.post_id,
      },
      attributes: [
        "id",
        "title",
        "artist",
        "post_content",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM thumbs WHERE post.id = thumbs.post_id)"
          ),
          "thumbs_count",
        ],
      ],
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  });
});

router.put("/:id", (req, res) => {
  Post.update(
    {
      ...req.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id." });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
