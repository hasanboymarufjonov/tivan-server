const express = require("express");

const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/manage", getAllUsers);
router.put("/:userId/update-role", updateUserRole);
router.put("/:userId/update-status", updateUserStatus);
router.delete("/:userId", deleteUser);

module.exports = router;
