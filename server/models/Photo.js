const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    likes: {
      type: Number,
      default: 0,
    },

    downloads: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Photo", photoSchema);