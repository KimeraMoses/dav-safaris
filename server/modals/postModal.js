const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postImage: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "name can not be empty!"],
    },
    post_content: {
      type: String,
      required: [true, "post_content can not be empty!"],
    },
    post_blocks: [],
    key_words: [String],
    slug: String,

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Post", postSchema);
