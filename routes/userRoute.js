const express = require('express');
const {registerUser, loginUser, userOTP, isLoggedIn, logoutUser} = require('../controllers/userControllers');
const router = express.Router();
const {jwtAuth} = require('../middleware/jwt');

router.post('/sendotp', userOTP);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/islogged',jwtAuth, isLoggedIn);
router.post('/logout',jwtAuth, logoutUser);


module.exports = router;