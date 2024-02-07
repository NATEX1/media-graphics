const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const { getAllUsers, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.delete("/:userId", verifyToken, verifyAdmin, deleteUser)

module.exports = router;
