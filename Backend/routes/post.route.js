const express = require('express');
const router = express.Router();
const { create, getPosts } = require('../controllers/post.controller');
const { verifyToken } = require('../utils/VerifyUser');

router.post("/create", verifyToken, create);
router.get("/getposts",getPosts);

module.exports = router;
