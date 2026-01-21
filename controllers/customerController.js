const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM customers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM customers WHERE cust_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Customer not found" });

      res.json(result[0]);
    }
  );
};

exports.create = (req, res) => {
  db.query("INSERT INTO customers SET ?", req.body, err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Customer added" });
  });
};

exports.createById = (req, res) => {
  const customerId = req.params.id;

  const data = {
    customer_id: customerId,
    ...req.body
  };

  db.query(
    "INSERT INTO customers SET ?",
    data,
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Customer added by ID" });
    }
  );
};


exports.update = (req, res) => {
  const id = req.params.id;

  db.query(
    "UPDATE customers SET ? WHERE CUST_ID = ?",
    [req.body, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer tidak ditemukan" });
      }

      res.json({ message: "Customer updated" });
    }
  );
};


exports.remove = (req, res) => {
  db.query(
    "DELETE FROM customers WHERE CUST_ID = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Customer deleted" });
    }
  );
};

