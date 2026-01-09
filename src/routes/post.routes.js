const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const createPostController = require("../controllers/post.Controller");
const multer = require("multer");

// POST  /api/post [protected] {image-file}bs ye file aayegi
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  authMiddleware, //req.userr=userData aa raha hai authmiddleware se
  upload.single("image"),
  createPostController
);

module.exports = router;
