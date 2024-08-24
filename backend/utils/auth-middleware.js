const User = require("../models/user");
const handleError = require("./handleError");

const authenticateUser = async (req, res, next) => {
  const userId = req.cookies.userId;
  console.log("Received userId cookie:", userId);

  if (!userId) {
    return handleError("Authentication failed!", 401, next);
  }

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return handleError("Authentication failed!", 401, next);
  }

  if (!user) {
    return handleError("Authentication failed!", 401, next);
  }

  req.user = user;
  next();
};

module.exports = authenticateUser;
