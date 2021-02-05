const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userRoutes = require("./users");
const songRoutes = require("./songs");

router.use("/users", userRoutes);
router.use("/songs", songRoutes);

module.exports = router;
