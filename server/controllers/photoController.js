const Photo = require("../models/Photo");
const cloudinary = require("../config/cloudinary");


// Upload Photo
const uploadPhoto = async (req, res) => {
  try {

    const { title, description, imageBase64 } = req.body;

    // Upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(
      imageBase64,
      {
        folder: "photo-marketplace",
      }
    );

    // Save in MongoDB
    const photo = await Photo.create({
      title,
      description,
      imageUrl: uploadedImage.secure_url,
      user: req.user._id,
    });

    res.status(201).json(photo);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Photos
const getPhotos = async (req, res) => {
  try {

    const photos = await Photo.find()
      .populate("user", "name email");

    res.json(photos);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* LIKE PHOTO */

const likePhoto = async (req, res) => {

  try {

    const photo =
    await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found",
      });
    }

    photo.likes += 1;

    await photo.save();

    res.json(photo);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* DELETE PHOTO */

const deletePhoto = async (req, res) => {

  try {

    const photo =
    await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        message: "Photo not found",
      });
    }

    // only owner can delete
    if (
      photo.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await photo.deleteOne();

    res.json({
      message: "Photo deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/* GET MY PHOTOS */

const getMyPhotos = async (req, res) => {

  try {

    const photos = await Photo.find({
      user: req.user._id,
    });

    res.json(photos);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadPhoto,
  getPhotos,
  likePhoto,
  deletePhoto,
  getMyPhotos,
};