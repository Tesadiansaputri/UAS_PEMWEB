const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM order_details", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  db.query("INSERT INTO order_details SET ?", req.body, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Order detail added" });
  });
};

exports.update = (req, res) => {
  db.query(
    "UPDATE order_details SET ? WHERE order_detail_id=?",
    [req.body, req.params.id],
    err => res.json({ message: "Order detail updated" })
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM order_details WHERE order_detail_id=?",
    [req.params.id],
    err => res.json({ message: "Order detail deleted" })
  );
};
