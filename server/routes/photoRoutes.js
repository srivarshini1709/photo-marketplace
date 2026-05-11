const express = require("express");

const {
  uploadPhoto,
  getPhotos,
  likePhoto,
  deletePhoto,
  getMyPhotos,
} = require("../controllers/photoController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// Upload
router.post("/", protect, uploadPhoto);


// Get all photos
router.get("/", getPhotos);
router.put("/like/:id", likePhoto);
router.delete("/:id", protect, deletePhoto);
router.get("/my/photos", protect, getMyPhotos);

module.exports = router;