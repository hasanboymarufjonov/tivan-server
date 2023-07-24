const express = require("express");

const {
  createCollection,
  getUserCollection,
  getLargestCollection,
  getLatestItems,
} = require("../controllers/collectionController");
const { getCollectionByTopic } = require("../controllers/topicController");

// const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createCollection);
router.get("/", getUserCollection);
router.get("/largest-collections", getLargestCollection);
router.get("/latest-items", getLatestItems);
router.get("/:topic", getCollectionByTopic);

module.exports = router;
