const db = require("../config/db");

exports.getAll = (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

  exports.getByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  db.query(
    "SELECT * FROM products WHERE category_id = ?",
    [categoryId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.getById = (req, res) => {
  db.query(
    "SELECT * FROM products WHERE product_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0)
        return res.status(404).json({ message: "Product not found" });

      res.json(result[0]);
    }
  );
};

  
exports.create = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  let data = {...req.body};

  if (req.file) {
    data.IMAGE = req.file.filename;
  }

  db.query("INSERT INTO products SET ?", data, err => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Product added" });
  });
};




exports.createById = (req, res) => {
  const customerId = req.params.id;

  const data = {
    customer_id: customerId,
    ...req.body
  };

  db.query(
    "INSERT INTO products SET ?",
    data,
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product added by ID" });
    }
  );
};

exports.update = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  console.log("ID:", req.params.id);

  let data = { ...req.body };

  if (req.file) {
    data.IMAGE = req.file.filename;
  }

  db.query(
    "UPDATE products SET ? WHERE product_id=?",
    [data, req.params.id],
    err => {
      if (err) {
        console.log("DB ERROR:", err); 
        return res.status(500).json(err);
      }
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
