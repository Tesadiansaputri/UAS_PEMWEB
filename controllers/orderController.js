const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM orders WHERE order_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Order not found" });

      res.json(result[0]);
    }
  );
};
exports.create = (req, res) => {
  db.query("INSERT INTO orders SET ?", req.body, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Order created" });
  });
};

exports.createById = (req, res) => {
  const customerId = req.params.id;

  const data = {
    customer_id: customerId,
    ...req.body
  };

  db.query(
    "INSERT INTO orders SET ?",
    data,
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Order added by ID" });
    }
  );
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
