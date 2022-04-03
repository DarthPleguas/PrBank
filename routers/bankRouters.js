let express = require("express");
let router = express.Router();
let methodOverride = require("method-override");
let {
  getAddBank,
  getBanks,
  getBank,
  addBank,
  getUpdateBank,
  updateBank,
  deleteBank,
} = require("../controllers/bankControllers");

router.use(express.urlencoded({ extended: false }));
router.use(methodOverride("_method"));

router.get("/add-bank", getAddBank);
router.get("/banks", getBanks);
router.get("/banks/:id", getBank);
router.post("/add-bank", addBank);
router.get("/edit/:id", getUpdateBank);
router.put("/edit/:id", updateBank);
router.delete("/banks/:id", deleteBank);

module.exports = router;
