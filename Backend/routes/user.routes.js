const express = require('express');
const { deleteuser } = require('../controllers/auth.controller');
const { verifyToken } = require('../utils/VerifyUser');
const router = express.Router();

router.delete("/delete/:userId",verifyToken,deleteuser)

module.exports = router;