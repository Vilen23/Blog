const Comment = require('../models/comment.model');
const createComment = async (req, res,next) => {
try {
    console.log("First step");
    const {content,postID,userID} = req.body;
    if(userID !==req.user.id){
        return next(errorHandler(401,'You are not allowed to comment on this post'))
    }
    const newComment = new Comment({
        content,
        postID,
        userID
    });
    await newComment.save();
    res.status(200).json(newComment);
} catch (error) {
    next(error);
}
}

module.exports={
    createComment
}