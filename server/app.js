const express = require("express");
const mongoose = require("mongoose");
const sitemapRouter = require("./routers/sitemapRouter");
const app = express();

const port = 8000,
  db = process.env.MDB_URL;

mongoose.connect(db).then((conn) => {
  console.log(`${db} connected`);
});

app.use("/", sitemapRouter);
app.listen(port, () => console.log(`Server listening on ${port}`));
