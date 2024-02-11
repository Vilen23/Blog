const express = require('express');
const { createComment, getpostComments, likeComment, editComment, deleteComment,getComments } = require('../controllers/comment.controller');
const { verifyToken } = require('../utils/VerifyUser');

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getpostcomments/:postID',getpostComments);
router.put('/likecomment/:commentID',verifyToken,likeComment);
router.put('/editcomment/:commentID',verifyToken,editComment);
router.delete('/deletecomment/:commentID',verifyToken,deleteComment);
router.get('/getcomments',verifyToken,getComments);

module.exports = router;