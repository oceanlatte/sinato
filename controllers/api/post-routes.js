const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");

//get all posts
router.get("/", (req, res) => {
    console.log("======================");
    Post.findAll({
        attributes: ["id", "title", "post_content", "created_at"],
        order: [['created_at', 'DESC']],
        include: [
            //includes the Comment model
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', text_content: 'Crazy that no one expected it.', user_id: 1}
    console.log(req.body),
    //console.log(req.session.user_id);
    Post.create({
        ...req.body
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;