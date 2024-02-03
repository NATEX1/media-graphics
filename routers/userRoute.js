const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const { getAllUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);

module.exports = router;
