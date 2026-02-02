const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getAITips } = require("../controllers/aiController");

router.get("/tips", auth, getAITips);

module.exports = router;
