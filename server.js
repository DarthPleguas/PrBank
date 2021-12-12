var express = require("express");
var PORT = 3000;
var path = require("path");
// var methodOverride = require("method-override");
// const Bank = require("./models/bank");
// require("dotenv").config();
var createPath = (page) => path.resolve(__dirname, "views", `${page}.ejs`);

var bodyParser = require("body-parser");

// const Post = require("./models/post");
// const mongoose = require("mongoose");

var app = express();

// mongoose
//   .connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((res) => console.log("connected to DB"))
//   .catch((error) => console.log(error));

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
var banks = [
{
    id: 1,
    title: "C-bank",
    interestRate: "10",
    maxLoan: "50000",
    term: "10",
  }];

app.post("/add-bank", (req, res) => {
  //const { title, interestRate, maxLoan, term } = req.body;
  var bank = {
  	id: Math.floor(Math.random()*100),
    title: req.body.title, 
    interestRate: req.body.interestRate, 
    maxLoan: req.body.maxLoan,
    term:req.body.term
  }
  banks.push(bank)
 res.send(banks)

 // res.render(createPath('bank'), { bank, title });

  // const bank = new Bank({ title, interestRate, maxLoan, term });

  // bank
  //   .save()
  //   .then((result) => res.redirect("/banks"))
  //   .catch((error) => {
  //     console.log(error);
  //     res.render(createPath("error"));
  //   });
});

app.get("/", (req, res) => {
  const title = 'Home';
  res.render(createPath("index"), { title });
});

app.get("/banks/:id", (req, res) => {
  // Bank.findById(req.params.id)
  //   .then((bank) => res.render(createPath("bank"), { bank }))
  //   .catch((error) => {
  //     console.log(error);
  //     res.render(createPath("error"));
  //   });

  const title = 'Bank';
  const id=req.params.id;
	const bank = banks.find((i)=>(i.id===Number(id)))
	res.json(bank);
});

app.get("/banks", (req, res) => {
  // Bank.find()
  //   .then((banks) => res.render(createPath("banks"), { banks }))
  //   .catch((error) => {
  //     console.log(error);
  //     res.render(createPath("error"));
  //   });

  const title = 'Banks';
  res.render(createPath("banks"), { title, banks });
});

app.get("/add-bank", (req, res) => {
  const title = 'Add Bank';
  res.render(createPath("add-bank"),{ title });
});

// app.get("/edit/:id", (req, res) => {
//   Bank.findById(req.params.id)
//     .then((bank) => res.render(createPath("edit-bank"), { bank }))
//     .catch((error) => {
//       console.log(error);
//       res.render(createPath("error"));
//     });
// });

// app.put("/edit/:id", (req, res) => {
//   const { title, interestRate, maxLoan, term } = req.body;
//   const { id } = req.params;
//   Bank.findByIdAndUpdate(id, { title, interestRate, maxLoan, term })
//     .then((result) => res.redirect(`/banks/${id}`))
//     .catch((error) => {
//       console.log(error);
//       res.render(createPath("error"));
//     });
// });

app.delete("/banks/:id", (req, res) => {
	banks=banks.filter(bank=>{
		return bank.id !== Number(req.params.id);
	})
	res.sendStatus(200);
});
//   Bank.findByIdAndDelete(req.params.id)
//     .then((result) => {
//       res.sendStatus(200);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.render(createPath("error"));
//     });
// });

app.use((req, res) => {
  res.status(404).render(createPath("error"));
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}...`);
});
