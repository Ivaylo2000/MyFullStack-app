const User = require("../models/user");
const handleError = require("../utils/handleError");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return handleError("Login failed! Error finding user.", 500, next);
  }

  if (!existingUser || existingUser.password !== password) {
    return handleError(
      "Invalid credentials! Please check your email and password.",
      401,
      next
    );
  }
  res.cookie("userId", existingUser._id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 5 * 60 * 1000,
    sameSite: "None",
    path: "/",
  });

  res.json({ message: "Logged in successfully!" });
};

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists." });
    }

    const createdUser = new User({ email, password });
    await createdUser.save();
    res.status(201).json({ user: createdUser });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Signup failed, please try again later." });
  }
};
exports.login = login;
exports.signup = signup;
