const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");

router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);

module.exports = router;
