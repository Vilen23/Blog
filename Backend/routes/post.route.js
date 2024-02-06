const express = require('express');
const router = express.Router();
const { create, getPosts, deletePost, updatePost } = require('../controllers/post.controller');
const { verifyToken } = require('../utils/VerifyUser');

router.post("/create", verifyToken, create);
router.get("/getposts",getPosts);
router.delete("/delete/:postID/:userID",verifyToken,deletePost);
router.put("/updatepost/:postID/:userID",verifyToken,updatePost);

module.exports = router;
