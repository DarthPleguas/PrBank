let express = require("express");
let app = express();
let PORT = process.env.PORT || 80;
let path = require("path");
let mongoose = require("mongoose");
require("dotenv").config();

let bankRouter = require("./routers/bankRouters");
let apiBankRouter = require("./routers/api-bankRouters");

let createPath = (page) => path.join(__dirname, "views", `${page}.ejs`);

//let db = `mongodb+srv://Roman:Roman4321@cluster0.xy7fk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

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

app.listen(PORT, () => {
  console.log(`Server has been started on Port 3000...`);
});
