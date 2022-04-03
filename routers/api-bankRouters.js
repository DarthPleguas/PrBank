let express = require("express");
let router = express.Router();
let methodOverride = require("method-override");
let {
  getBanks,
  getBank,
  addBank,
  updateBank,
  deleteBank,
} = require("../controllers/api-bankControllers");

router.use(express.urlencoded({ extended: false }));
router.use(methodOverride("_method"));

//Get all banks
router.get("/api/banks", getBanks);
//Add new bank
router.post("/api/add-bank", addBank);
//Get bank by id
router.get("/api/banks/:id", getBank);
//Put bank by id
router.put("/api/edit/:id", updateBank);
//Delete bank by id
router.delete("/api/banks/:id", deleteBank);

// router.get("/add-bank", getAddBank);
// router.get("/edit/:id", getUpdateBank);

module.exports = router;
