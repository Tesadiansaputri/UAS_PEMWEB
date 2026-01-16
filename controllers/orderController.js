const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  db.query("INSERT INTO orders SET ?", req.body, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Order created" });
  });
};

exports.update = (req, res) => {
  db.query(
    "UPDATE orders SET ? WHERE order_id=?",
    [req.body, req.params.id],
    err => res.json({ message: "Order updated" })
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM orders WHERE order_id=?",
    [req.params.id],
    err => res.json({ message: "Order deleted" })
  );
};
