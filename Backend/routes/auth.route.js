const express = require('express');
const { signup, signin, google, update } = require('../controllers/auth.controller');
const { verifyToken } = require('../utils/VerifyUser');
const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google)
router.put('/update', update);


module.exports = router;
