const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
<<<<<<< HEAD
app.use(cors()); 
=======
>>>>>>> 6112b20653b11f17727d0c4052cbc29db34262b2
app.use("/", require("./routes/Routes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/uploads", express.static("uploads"));



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
