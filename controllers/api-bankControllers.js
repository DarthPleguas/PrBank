let Bank = require("../models/bankModel");

let getBanks = (req, res) => {
  Bank.find()
    .sort({ createdAt: -1 })
    .then((banks) => res.status(200).json(banks))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

let getBank = (req, res) => {
  Bank.findById(req.params.id)
    .then((bank) => res.status(200).json(bank))
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
    .then((bank) => res.status(200).json(bank))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

let updateBank = (req, res) => {
  const { title, interestRate, maxLoan, term } = req.body;
  const { id } = req.params;
  Bank.findByIdAndUpdate(
    id,
    { title, interestRate, maxLoan, term },
    { new: true }
  )
    .then((bank) => res.status(200).json(bank))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

let deleteBank = (req, res) => {
  Bank.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"));
    });
};

module.exports = {
  getBanks,
  getBank,
  addBank,
  updateBank,
  deleteBank,
};
