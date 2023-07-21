const Collection = require("../models/collectionModel");
const asyncHandler = require("express-async-handler");

const addItemToCollection = asyncHandler(async (req, res) => {
  const { collectionId } = req.params;
  const { itemName, itemDescription } = req.body;
  console.log(itemName, itemDescription);
  try {
    // Find the collection by its ID
    const collection = await Collection.findById(collectionId);

    if (!collection) {
      res.status(404);
      throw new Error("Collection not found.");
    }

    // Create the new item
    const newItem = {
      itemName,
      itemDescription,
    };

    // Push the item to the collection's "items" array (assuming "items" is an array in your Collection model)
    collection.collectionItems.push(newItem);

    // Save the updated collection
    await collection.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400);
    throw new Error("Failed to add item to the collection.");
  }
});

module.exports = { addItemToCollection };
