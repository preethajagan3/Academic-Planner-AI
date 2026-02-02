const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { addSlot, getTimetable, updateSlot, deleteSlot } = require("../controllers/timetableController");

router.post("/", auth, addSlot);
router.get("/", auth, getTimetable);
router.put("/:id", auth, updateSlot);
router.delete("/:id", auth, deleteSlot);

module.exports = router;
