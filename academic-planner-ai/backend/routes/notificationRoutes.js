const express = require("express");
const router = express.Router();
const {
    getNotifications,
    checkDeadlines,
    markAsRead,
    clearAll
} = require("../controllers/notificationController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getNotifications);
router.post("/check", auth, checkDeadlines);
router.put("/:id/read", auth, markAsRead);
router.delete("/clear", auth, clearAll);

module.exports = router;
