let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bankModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  interestRate: {
    type: String,
    required: true,
  },
  maxLoan: {
    type: String,
    required: true,
  },
  term: {
    type: String,
    required: true,
  },
});

let Bank = mongoose.model("Bank", bankModel);

module.exports = Bank;
