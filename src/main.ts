"use strict";

import express from "express";

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
// server.use(express.json({ extended: false }));

server.use((req, res) => {
  res.json({ message: 'Votre requête a bien été reçue !' }); 
});

server.listen(8080);

module.exports = server;