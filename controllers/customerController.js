const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.create = (req, res) => {
  db.query("INSERT INTO customers SET ?", req.body, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Customer added" });
  });
};

exports.update = (req, res) => {
  db.query(
    "UPDATE customers SET ? WHERE customer_id=?",
    [req.body, req.params.id],
    err => res.json({ message: "Customer updated" })
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM customers WHERE customer_id=?",
    [req.params.id],
    err => res.json({ message: "Customer deleted" })
  );
};
