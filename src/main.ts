"use strict";

import express from "express";
import authRoutes from "./routes/auth";
import productRoutes from "./routes/product";
import categoryRoutes from "./routes/product-category";
import inventoryRoutes from "./routes/product-inventory";

const server = express();

server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Allows to recover JSON Data in request
server.use(express.json());

server.use("/auth", authRoutes);
server.use("/product", productRoutes);
server.use("/category", categoryRoutes);
server.use("/inventory", inventoryRoutes);

server.listen(8080);

module.exports = server;