const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const Collection = require("../models/collectionModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createCollection = asyncHandler(async (req, res) => {
  const { collectionName, collectionDescription, collectionTopic } = req.body;

  let token = req.cookies.jwt;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  const user = await User.findById(userId);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  const collectionAuthor = user;

  const collection = await Collection.create({
    collectionName,
    collectionAuthor,
    collectionTopic,
    collectionDescription,
  });

  if (collection) {
    res.status(201).json({
      _id: collection._id,
      collectionAuthor: collection.collectionAuthor,
      collectionName: collection.collectionTitle,
      collectionDescription: collection.collectionDescription,
      collectionTopic: collection.collectionTopic,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create collection.");
  }
});

const getUserCollection = asyncHandler(async (req, res) => {
  let token = req.cookies.jwt;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  const user = await User.findById(userId);

  const collections = await Collection.find({ collectionAuthor: userId });

  res.status(200).json(collections);
});

const getLargestCollection = asyncHandler(async (req, res) => {
  try {
    const collectionsWithItems = await Collection.aggregate([
      // Filter collections with non-empty 'collectionItems' array
      {
        $match: {
          collectionItems: { $exists: true, $not: { $size: 0 } },
        },
      },
      // Add a new field 'numCollectionItems' to each document containing the count of 'collectionItems'
      {
        $addFields: {
          numCollectionItems: { $size: "$collectionItems" },
        },
      },
      // Sort the documents in descending order based on 'numCollectionItems'
      {
        $sort: {
          numCollectionItems: -1,
        },
      },
      // Limit the result to the top 6 collections
      {
        $limit: 6,
      },
    ]);

    res.status(200).json(collectionsWithItems);
  } catch (error) {
    console.error("Error fetching largest collections:", error);
    res.status(500).json({ message: "Error fetching largest collections" });
  }
});

const getLatestItems = asyncHandler(async (req, res) => {
  try {
    const latestItems = await Collection.aggregate([
      { $unwind: "$collectionItems" },
      { $sort: { "collectionItems.createdAt": -1 } },
      { $limit: 6 },
      {
        $project: {
          _id: "$collectionItems._id",
          collectionName: "$collectionName",
          collectionTopic: 1,
          collectionDescription: 1,
          collectionAuthor: 1,
          itemDescription: "$collectionItems.itemDescription",
          itemName: "$collectionItems.itemName",
          createdAt: "$collectionItems.createdAt",
          updatedAt: "$collectionItems.updatedAt",
        },
      },
    ]);
    for (const item of latestItems) {
      const authorId = item.collectionAuthor;
      const user = await User.findById(authorId);
      item.collectionAuthor = user.name;
    }
    res.json(latestItems);
  } catch (error) {
    res.status(500).json({ error: "Error fetching latest items." });
  }
});

module.exports = {
  createCollection,
  getUserCollection,
  getLargestCollection,
  getLatestItems,
};
