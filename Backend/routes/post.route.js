const express = require('express');
const router = express.Router();
const { create, getPosts, deletePost } = require('../controllers/post.controller');
const { verifyToken } = require('../utils/VerifyUser');

router.post("/create", verifyToken, create);
router.get("/getposts",getPosts);
router.delete("/delete/:postID/:userID",verifyToken,deletePost);

module.exports = router;
