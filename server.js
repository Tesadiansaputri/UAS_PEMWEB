const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors()); 
app.use("/", require("./routes/Routes"));
app.use("/products", require("./routes/productRoutes"));
app.use("/uploads", express.static("uploads"));


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
