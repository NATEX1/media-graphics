const express = require("express");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");
const {
  savedResult,
  getResult,
  getResultById,
  getAllResults,
  getResultByUserId,
} = require("../controllers/resultController");
const router = express.Router();

router.post("/", verifyToken, savedResult);
router.get("/", verifyToken, getResult);
router.get("/all", verifyToken, verifyAdmin, getAllResults);
router.get("/:id", verifyToken, getResultById);
router.get("/user/:userId", verifyToken, verifyAdmin, getResultByUserId);

module.exports = router;
