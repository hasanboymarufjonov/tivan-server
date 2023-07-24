const Collection = require("../models/collectionModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const getCollectionByTopic = asyncHandler(async (req, res) => {
  const topic = req.params.topic;

  try {
    const collections = await Collection.find({ collectionTopic: topic });

    const collectionsWithAuthorName = await Promise.all(
      collections.map(async (collection) => {
        const user = await User.findById(collection.collectionAuthor, "name");
        return {
          ...collection.toObject(),
          collectionAuthor: user ? user.name : "Unknown Author",
        };
      })
    );

    res.json(collectionsWithAuthorName);
  } catch (error) {
    res.status(500).json({ error: "Error fetching collections." });
  }
});

module.exports = { getCollectionByTopic };
