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

const getpostComments = async (req, res,next) => {
    try {
        const comments = await Comment.find({postID:req.params.postID}).sort({createdAt:-1});
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

const likeComment = async (req, res,next) => {
    try {
        const comment = await Comment.findById(req.params.commentID);
        if(!comment){
            return next(errorHandler(404,'Comment not found'))
        }
        const userIndex = comment.likes.indexOf(req.user.id);
        if(userIndex === -1){
            comment.numberoflikes+=1;
            comment.likes.push(req.user.id);
        }else{
            comment.numberoflikes-=1;
            comment.likes.splice(userIndex,1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error)
    }
}
    
const editComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentID);
        if(!comment){
            return next(errorHandler(404,'Comment not found'))
        }
        if(comment.userID !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(401,'You are not allowed to edit this comment'))
        }
        const editedComment = await Comment.findByIdAndUpdate(req.params.commentID,{
            content:req.body.content
        },{new:true});
        res.status(200).json(editedComment);

    } catch (error) {
        next(error)
    }
}

const deleteComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.commentID);
        if(!comment){
            return next(errorHandler(404,'Comment not found'))
        }
        if(comment.userID !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(401,'You are not allowed to delete this comment'))
        }
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentID);
        res.status(200).json('Comment has been deleted');
    } catch (error) {
        next(error)
    }
}

const getComments = async (req, res, next) => {
    if (!req.user.isAdmin)
      return next(errorHandler(403, 'You are not allowed to get all comments'));
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'desc' ? -1 : 1;
      const comments = await Comment.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const totalComments = await Comment.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthComments = await Comment.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
      next(error);
    }
  };

module.exports={
    createComment,
    getpostComments,
    likeComment,
    editComment,
    deleteComment,
    getComments
}