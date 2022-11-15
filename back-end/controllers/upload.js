const cloudinary = require("../configs/cloudinary");

exports.uploadVideo = (req, res) => {
  cloudinary.uploader.upload(
    req.file.path,
    {
      resource_type: "video",
      folder: "video",
    },

    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      return res.status(200).json({
        success: true,
        message: "Upload Video thành công",
      });
    }
  );
};
