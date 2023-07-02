const express = require("express");
const router = express.Router();

const {
  getAllAccounts,
  getAccount,
  createAccount,
  deleteAccount,
} = require("../controllers/accounts");

router.route("/").get(getAllAccounts);
router.route("/:id").get(getAccount);
module.exports = router;
