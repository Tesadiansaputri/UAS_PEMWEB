const express = require("express");
const {
  no1_produkTerbanyakTahunLalu,
  no2_customerOrderTerbanyak,
  no3_customerNominalTerbesar,
  no4_itemTerbanyakPerCustomer,
  no5_top10ProdukTerlaris,
  no6_profitBulananProduk,
  no7_penjualanBulananProduk,
  no8_orderBulananCustomer,
  no9_nominalBulananCustomer,
  no10_layananBulananKasir
} = require("../controllers/SBD1Controller");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ status: "SBD1 OK" });
});

router.get("/no1", no1_produkTerbanyakTahunLalu);
router.get("/no2", no2_customerOrderTerbanyak);
router.get("/no3", no3_customerNominalTerbesar);
router.get("/no4", no4_itemTerbanyakPerCustomer);
router.get("/no5", no5_top10ProdukTerlaris);
router.get("/no6", no6_profitBulananProduk);
router.get("/no7", no7_penjualanBulananProduk);
router.get("/no8", no8_orderBulananCustomer);
router.get("/no9", no9_nominalBulananCustomer);
router.get("/no10", no10_layananBulananKasir);

module.exports = router;
