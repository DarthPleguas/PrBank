let express = require("express");
let app = express();
let path = require("path");
let mongoose = require("mongoose");
require("dotenv").config();

let bankRouter = require("./routers/bankRouters");
let apiBankRouter = require("./routers/api-bankRouters");

let createPath = (page) => path.join(__dirname, "views", `${page}.ejs`);

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("connected to DB"))
  .catch((error) => console.log(error));

app.set("view engine", "ejs");

app.use(bankRouter);
app.use(apiBankRouter);

app.get("/", (req, res) => {
  res.render(createPath("index"));
});

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server has been started on Port ${process.env.PORT}...`);
});
