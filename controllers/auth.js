const User = require("../models/User");
const Account = require("../models/Account");
const FriendData = require("../models/FriendsData");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { email, password, name, coverUrl, avatarUrl } = req.body;
  const user = await User.create({ email, password });
  const account = await Account.create({
    name,
    coverUrl,
    avatarUrl,
    createdBy: user.id,
  });
  const friendRequest = await FriendData.create({ createdBy: user.id });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: name,
      email: email,
      coverUrl: coverUrl,
      avatarUrl: avatarUrl,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  //compare password
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      id: user.id,
    },
    token,
  });
};

module.exports = {
  register,
  login,
};
