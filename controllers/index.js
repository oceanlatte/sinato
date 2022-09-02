const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const dashBoardRoutes = require("./dashboard-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashBoardRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;