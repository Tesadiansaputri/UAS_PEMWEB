const db = require("../config/db");

/*
CATATAN:
YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
*/

const no1_produkTerbanyakTahunLalu = async (req, res) => {
  try {
    const sql = `
      SELECT p.PRODUCT_NAME, x.total_qty
      FROM products p
      JOIN (
        SELECT od.PRODUCT_ID, SUM(od.QTY) AS total_qty
        FROM order_details od
        JOIN orders o ON o.ORDER_ID = od.ORDER_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY od.PRODUCT_ID
      ) x ON x.PRODUCT_ID = p.PRODUCT_ID
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no2_customerOrderTerbanyak = async (req, res) => {
  try {
    const sql = `
      SELECT c.CUST_NAME, x.total_order
      FROM customers c
      JOIN (
        SELECT CUST_ID, COUNT(*) AS total_order
        FROM orders
        WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY CUST_ID
        ORDER BY total_order DESC
        LIMIT 1
      ) x ON x.CUST_ID = c.CUST_ID
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no3_customerNominalTerbesar = async (req, res) => {
  try {
    const sql = `
      SELECT c.CUST_NAME, x.total_nominal
      FROM customers c
      JOIN (
        SELECT CUST_ID, SUM(TOTAL) AS total_nominal
        FROM orders
        WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY CUST_ID
        ORDER BY total_nominal DESC
        LIMIT 1
      ) x ON x.CUST_ID = c.CUST_ID
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no4_itemTerbanyakPerCustomer = async (req, res) => {
  try {
    const sql = `
      SELECT c.CUST_NAME, x.total_item
      FROM customers c
      JOIN (
        SELECT o.CUST_ID, SUM(od.QTY) AS total_item
        FROM orders o
        JOIN order_details od ON od.ORDER_ID = o.ORDER_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY o.CUST_ID
        ORDER BY total_item DESC
        LIMIT 1
      ) x ON x.CUST_ID = c.CUST_ID
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no5_top10ProdukTerlaris = async (req, res) => {
  try {
    const sql = `
      SELECT p.PRODUCT_NAME, x.total_qty
      FROM products p
      JOIN (
        SELECT od.PRODUCT_ID, SUM(od.QTY) AS total_qty
        FROM order_details od
        JOIN orders o ON o.ORDER_ID = od.ORDER_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY od.PRODUCT_ID
        ORDER BY total_qty DESC
        LIMIT 10
      ) x ON x.PRODUCT_ID = p.PRODUCT_ID
      ORDER BY x.total_qty DESC
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no6_profitBulananProduk = async (req, res) => {
  try {
    const sql = `
      SELECT p.PRODUCT_NAME, x.bulan, x.total_penjualan
      FROM products p
      JOIN (
        SELECT od.PRODUCT_ID,
               MONTH(o.ORDER_DATE) AS bulan,
               SUM(p.PRICE * od.QTY) AS total_penjualan
        FROM order_details od
        JOIN orders o ON o.ORDER_ID = od.ORDER_ID
        JOIN products p ON p.PRODUCT_ID = od.PRODUCT_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY od.PRODUCT_ID, MONTH(o.ORDER_DATE)
      ) x ON x.PRODUCT_ID = p.PRODUCT_ID
      ORDER BY p.PRODUCT_NAME, x.bulan
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no7_penjualanBulananProduk = async (req, res) => {
  try {
    const sql = `
      SELECT p.PRODUCT_NAME, x.bulan, x.total_qty
      FROM products p
      JOIN (
        SELECT od.PRODUCT_ID,
               MONTH(o.ORDER_DATE) AS bulan,
               SUM(od.QTY) AS total_qty
        FROM order_details od
        JOIN orders o ON o.ORDER_ID = od.ORDER_ID
        WHERE YEAR(o.ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY od.PRODUCT_ID, MONTH(o.ORDER_DATE)
      ) x ON x.PRODUCT_ID = p.PRODUCT_ID
      ORDER BY p.PRODUCT_NAME, x.bulan
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no8_orderBulananCustomer = async (req, res) => {
  try {
    const sql = `
      SELECT c.CUST_NAME, x.bulan, x.total_order
      FROM customers c
      JOIN (
        SELECT CUST_ID,
               MONTH(ORDER_DATE) AS bulan,
               COUNT(*) AS total_order
        FROM orders
        WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY CUST_ID, MONTH(ORDER_DATE)
      ) x ON x.CUST_ID = c.CUST_ID
      ORDER BY c.CUST_NAME, x.bulan
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no9_nominalBulananCustomer = async (req, res) => {
  try {
    const sql = `
      SELECT c.CUST_NAME, x.bulan, x.total_nominal
      FROM customers c
      JOIN (
        SELECT CUST_ID,
               MONTH(ORDER_DATE) AS bulan,
               SUM(TOTAL) AS total_nominal
        FROM orders
        WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY CUST_ID, MONTH(ORDER_DATE)
      ) x ON x.CUST_ID = c.CUST_ID
      ORDER BY c.CUST_NAME, x.bulan
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

const no10_layananBulananKasir = async (req, res) => {
  try {
    const sql = `
      SELECT k.USERNAME, x.bulan, x.total_layanan
      FROM cashiers k
      JOIN (
        SELECT USER_ID,
               MONTH(ORDER_DATE) AS bulan,
               COUNT(*) AS total_layanan
        FROM orders
        WHERE YEAR(ORDER_DATE) = YEAR(CURDATE()) - 1
        GROUP BY USER_ID, MONTH(ORDER_DATE)
      ) x ON x.USER_ID = k.USER_ID
      ORDER BY k.USERNAME, x.bulan
    `;
    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
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
};

