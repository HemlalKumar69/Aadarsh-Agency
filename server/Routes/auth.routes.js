const express = require("express");
const router = express.Router();
const loginCtrl = require("../Controller/auth.controller");

router.post("/register", loginCtrl.register);
router.post("/login", loginCtrl.login);
router.post("/logout", loginCtrl.logout);

module.exports = router;
