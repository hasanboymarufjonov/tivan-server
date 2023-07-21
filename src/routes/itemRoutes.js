const express = require("express");
const { addItemToCollection } = require("../controllers/itemController");

const router = express.Router();

router.post("/:collectionId", addItemToCollection);

module.exports = router;
