const { StatusCodes } = require("http-status-codes");
const Account = require("../models/Account");


const getAllAccounts = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const accounts = await Account.find({ createdBy: { $ne: userId } }).sort(
    "createdAt"
  );
  console.log("this is req.user", userId);
  res.status(StatusCodes.OK).json({ accounts, count: accounts.length });
};
const getAccount = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const account = await Account.findOne({
    createdBy: userId,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json(account);
};


module.exports = {
  getAllAccounts,
  getAccount,
};
