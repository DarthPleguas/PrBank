let Bank = require("../models/bankModel");
let path = require("path");
let createPath = (page) => path.join(__dirname, "../views", `${page}.ejs`);

let getAddBank = (req, res) => {
  res.render(createPath("add-bank"));
};

let getBanks = (req, res) => {
  Bank.find()
    .then((banks) => res.render(createPath("banks"), { banks }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

let getBank = (req, res) => {
  Bank.findById(req.params.id)
    .then((bank) => res.render(createPath("bank"), { bank }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

let addBank = (req, res) => {
  const { title, interestRate, maxLoan, term } = req.body;
  const bank = new Bank({ title, interestRate, maxLoan, term });
  bank
    .save()
    .then((result) => res.redirect("/banks"))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

let getUpdateBank = (req, res) => {
  Bank.findById(req.params.id)
    .then((bank) => res.render(createPath("edit-bank"), { bank }))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

let updateBank = (req, res) => {
  const { title, interestRate, maxLoan, term } = req.body;
  const { id } = req.params;
  Bank.findByIdAndUpdate(id, { title, interestRate, maxLoan, term })
    .then((result) => res.redirect(`/banks/${id}`))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

let deleteBank = (req, res) => {
  Bank.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

module.exports = {
  getAddBank,
  getBanks,
  getBank,
  addBank,
  getUpdateBank,
  updateBank,
  deleteBank,
};
