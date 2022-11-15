const router = require("express").Router();
const uploadController = require("../controllers/upload");

const storage = require("../configs/multer");

router.post(
  "/uploadVideo",
  storage.single("file"),
  uploadController.uploadVideo
);

module.exports = router;
