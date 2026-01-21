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
  console.log("BODY:", req.body);

  const data = {
    CUST_ID: req.body.cust_id,
    ORDER_DATE: req.body.order_date + " 00:00:00",
    USER_ID: "24090038",
    TOTAL: req.body.total,
    METHOD_ID: String(req.body.method_id)
  };

  console.log("DATA:", data);

  db.query("INSERT INTO orders SET ?", data, err => {
    if (err) {
      console.log("DB ERROR:", err); 
      return res.status(500).json(err);
    }
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
