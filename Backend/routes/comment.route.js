const express = require('express');
const { createComment, getpostComments } = require('../controllers/comment.controller');
const { verifyToken } = require('../utils/VerifyUser');
const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getpostcomments/:postID',getpostComments)

module.exports = router;