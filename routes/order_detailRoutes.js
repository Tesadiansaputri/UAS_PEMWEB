const express = require("express");
const router = express.Router();
const controller = require("../controllers/order_detailControllers");

router.get("/", controller.getAll);
router.get("/order/:order_id", controller.getByOrderId);

router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);



module.exports = router;
