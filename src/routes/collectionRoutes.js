const express = require("express");

const {
  createCollection,
  getUserCollection,
  getLargestCollection,
  getLatestItems,
} = require("../controllers/collectionController");

// const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createCollection);
router.get("/", getUserCollection);
router.get("/largest-collections", getLargestCollection);
router.get("/latest-items", getLatestItems);

module.exports = router;
