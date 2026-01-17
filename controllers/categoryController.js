const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM product_categories", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM product_categories WHERE category_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Category not found" });

      res.json(result[0]);
    }
  );
};


exports.create = (req, res) => {
  const { category_id, category_name } = req.body;
  db.query(
    "INSERT INTO product_categories VALUES (?,?)",
    [category_id, category_name],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Category added" });
    }
  );
};

exports.createById = (req, res) => {
  const customerId = req.params.id;

  const data = {
    customer_id: customerId,
    ...req.body
  };

  db.query(
    "INSERT INTO product_categories SET ?",
    data,
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Category added by ID" });
    }
  );
};

exports.update = (req, res) => {
  db.query(
    "UPDATE product_categories SET category_name=? WHERE category_id=?",
    [req.body.category_name, req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Category updated" });
    }
  );
};

exports.remove = (req, res) => {
  db.query(
    "DELETE FROM product_categories WHERE category_id=?",
    [req.params.id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Category deleted" });
    }
  );
};
