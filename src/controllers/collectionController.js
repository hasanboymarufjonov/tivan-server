const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const Collection = require("../models/collectionModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createCollection = asyncHandler(async (req, res) => {
  const { collectionName, collectionDescription, collectionTopic } = req.body;

  // Retrieve the JWT token from the cookies
  let token = req.cookies.jwt;

  // Verify the JWT token and extract the userId
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  // Find the user in the database using the extracted userId
  const user = await User.findById(userId);

  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  // Use the user's name as the collectionAuthor
  const collectionAuthor = user;

  // Create the collection using the received data
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

module.exports = {
  createCollection,
  getUserCollection,
};
