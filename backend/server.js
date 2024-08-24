const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");
const cartRoutes = require("./routes/cart-routes");
const handleError = require("./utils/handleError");
const cors = require("cors");

const server = express();

server.use(bodyParser.json());
server.use(cookieParser());

server.use(
  cors({
    origin: "https://full-stack-app-egq8.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

server.use("/products", productsRoutes);
server.use("/user", usersRoutes);
server.use("/cart", cartRoutes);

server.use((req, res, next) => {
  return handleError("Resource not found.", 404, next);
});

server.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fullstack.jqhl5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=fullStack`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    server.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = server;
