const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const upload = require("../middlewares/upload");

router.get("/", controller.getAll);
router.get("/category/:categoryId", controller.getByCategory);
router.get("/:id", controller.getById);

router.post("/", upload.single("IMAGE"), controller.create);
router.post("/:id", controller.createById);

router.put("/:id", upload.single("IMAGE"), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
