const express = require("express");
const router = express.Router();

router.use("/categories", require("./categoryRoutes"));
router.use("/products", require("./productRoutes"));
router.use("/customers", require("./customerRoutes"));
router.use("/orders", require("./orderRoutes"));
router.use("/order-details", require("./order_detailRoutes"));
router.use("/sbd1", require("./SBD1Routes"));

router.get("/", (req, res) => {
  res.send("API Genexmart OK");
});

module.exports = router;
