const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  db.query("INSERT INTO products SET ?", req.body, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product added" });
  });
};

exports.update = (req, res) => {
  db.query(
    "UPDATE products SET ? WHERE product_id=?",
    [req.body, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product updated" });
    }
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM products WHERE product_id=?",
    [req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product deleted" });
    }
  );
};
