const express = require('express');
const { deleteuser, getUsers, deleteuserbyadmin, getuser } = require('../controllers/auth.controller');
const { verifyToken } = require('../utils/VerifyUser');
const router = express.Router();

router.delete("/delete/:userId",verifyToken,deleteuser)
router.get("/getusers",verifyToken,getUsers);
router.delete('/deleteuser/:userId/:adminId',verifyToken,deleteuserbyadmin);
router.get("/:userId",getuser);

module.exports = router;