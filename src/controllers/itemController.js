const Collection = require("../models/collectionModel");
const asyncHandler = require("express-async-handler");

const addItemToCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;
  const { itemName, itemDescription } = req.body;
  try {
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      res.status(404);
      throw new Error("Collection not found.");
    }

    const newItem = {
      itemName,
      itemDescription,
    };

    collection.collectionItems.push(newItem);

    await collection.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to add item to the collection.");
  }
});

module.exports = { addItemToCollection };
