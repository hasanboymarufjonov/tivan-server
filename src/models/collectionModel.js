const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
    },
    collectionAuthor: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    collectionTopic: {
      type: String,
      required: true,
    },
    collectionDescription: {
      type: String,
      required: true,
    },
    // collectionItems: {
    //   type: Object,
    // },
    collectionItems: [
      {
        itemName: {
          type: String,
          required: true,
        },
        itemDescription: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
