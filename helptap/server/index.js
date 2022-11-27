const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

// local import
const sellerRoute = require("./routes/sellerRoute");
const buyerRouter = require("./routes/buyerRoute");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send({ msg: "works.." });
});

// routes
app.use("/seller", sellerRoute);
app.use("/", buyerRouter);
