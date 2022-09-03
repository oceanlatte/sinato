const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Vote } = require("../models");

router.get("/", (req, res) => {
    Post.findAll({
        // sessions here <=================
        attributes: [
            "id",
            "title",
            "post_content",
            "created_at",
            [sequelize.literal("(COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post = post.get({ plain: true }));
            res.render("dashboard", { posts })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/edit/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        where: {
            id: req.params.id
        },
        // attributes: [
        //     "id",
        //     "post_content",
        //     "title",
        //     "created_at",
        //     [sequelize.literal("(COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
        // ],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "post_id",
                    "user_id",
                    "created_at"
                ],
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
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("edit-post", {
                    post
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get("/editcomments/:id", (req, res) => {
    Comment.findByPk(

    )
        .then(dbCommentData => {
            if(dbCommentData) {
                const comment = dbCommentData.get({ plain: true });

                res.render("edit-comment", {
                    comment
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get("/new", (req, res) => {
    Post.findAll({
        //session <==================
        attributes: [
            "id",
            "title",
            "text_conent",
            "created_at",
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get ({ plain: true }));
        res.render("add-post", { posts }); //<=====login stuff
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;