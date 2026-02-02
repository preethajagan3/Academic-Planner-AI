const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { addProgress, getProgress, updateProgress, deleteProgress } = require("../controllers/progressController");

router.post("/", auth, addProgress);
router.get("/", auth, getProgress);
router.put("/:id", auth, updateProgress);
router.delete("/:id", auth, deleteProgress);

module.exports = router;
