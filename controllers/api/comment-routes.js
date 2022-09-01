const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

router.post('/', (req, res) => {
    console.log(req.body); 
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
        
        
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


module.exports = router;