const express = require('express');
const { deleteuser, getUsers } = require('../controllers/auth.controller');
const { verifyToken } = require('../utils/VerifyUser');
const router = express.Router();

router.delete("/delete/:userId",verifyToken,deleteuser)
router.get("/getusers",verifyToken,getUsers)

module.exports = router;