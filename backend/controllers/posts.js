const { validationResult } = require('express-validator');



exports.fetchAll = async (req, res, next) => {
try{
    const [allPosts]=await Post.fetchAll();
    res.status(200).json(allPosts);

}catch(err){
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
}
}

const Post = require('../models/post');

exports.postPost = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const title = req.body.title;
    const body = req.body.body;
    const user = req.body.user;

    try {
      
        const post = {
            title: title,
            body: body,
            user: user
        };
        const result = await Post.save(post);

        res.status(201).json({ message: 'Posted!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
exports.deletePost = async (req, res, next) => {
    try{
        const deleteResponse=await Post.delete(req.params.id);
        res.status(200).json(deleteResponse);
    
    }catch(err){
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    }

