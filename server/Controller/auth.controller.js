const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT, { expiresIn: "2D" });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const findUser = await User.findOne({ name });
    if (findUser) {
      return res
        .status(400)
        .json({ message: "name already existed choose unique one " });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res
        .status(400)
        .json({ message: "email already existed choose unique one " });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    res.status(201).json({
      message: "user Register successfully",
    });
  } catch (error) {
    console.error("Error during salesman login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(400).json({ message: "Wrong credential" });
    }

    const checkpaswwor = await user.comparePassword(password);

    if (!checkpaswwor) {
      return res.status(400).json({ message: "Wrong credential" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User login successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during salesman login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during user logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
