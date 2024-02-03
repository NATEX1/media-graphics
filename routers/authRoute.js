const express = require("express");
const path = require('path')
const multer = require("multer");
const {
  login,
  register,
  updateUser,
  updateUserImage,
  getMe,
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Specify the destination folder
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      
      // Get the file extension from the original filename
      const fileExtension = path.extname(file.originalname);
      
      // Use a unique filename with the original file extension
      cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
  });
  

const upload = multer({ storage });

router.get("/me", verifyToken, getMe)
router.post("/login", login);
router.post("/register", register);
router.put("/update", verifyToken,  updateUser);
router.post("/upload-image", verifyToken, upload.single("image"), updateUserImage)

module.exports = router;
