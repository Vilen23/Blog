const express = require('express');
const { createComment } = require('../controllers/comment.controller');
const { verifyToken } = require('../utils/VerifyUser');
const router = express.Router();

router.post('/create',verifyToken,createComment);

module.exports = router;