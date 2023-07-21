const express = require("express");

const {
  createCollection,
  getUserCollection,
} = require("../controllers/collectionController");

// const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", createCollection);
router.get("/", getUserCollection);

module.exports = router;
