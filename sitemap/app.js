const express = require("express");
const mongoose = require("mongoose");
const { MD_URL } = require("./DB");
const sitemapRouter = require("./routers/sitemapRouter");
const app = express();

const port = 8000,
  db = MD_URL;

mongoose.connect(db).then((conn) => {
  console.log(`${db} connected`);
});

app.use("/", sitemapRouter);
app.listen(port, () => console.log(`Server listening on ${port}`));
