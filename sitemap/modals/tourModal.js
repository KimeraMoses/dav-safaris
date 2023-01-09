const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],

    trim: true,
  },
  country: {
    type: String,

    trim: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  summary: {
    type: String,
  },
  slug: String,
  tourActivities: [],
  dayActivityDescription: [],
  duration: {
    type: Number,
  },
  maxGroupSize: {
    type: Number,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
  },
  imageCover: {
    type: String,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  locations: [],
  key_words: [],
  packageDetails: {},
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
    set: (val) => Math.round(val * 10) / 10, // 4.666, 46.6666, 47, 4.7
  },
});

module.exports = mongoose.model("Tour", tourSchema);
