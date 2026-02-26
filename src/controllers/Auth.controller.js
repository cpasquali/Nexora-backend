import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import { Op } from "sequelize";

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password must match" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
      },
    });

    if (user)
      return res
        .status(404)
        .json({ message: "A user with this email or username already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hash });

    return res.status(201).json({ message: "Registration successful" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user)
      return res.status(404).json({ message: "Incorrect credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({ message: "Incorrect credentials" });

    return res.status(200).json({ message: "Ok", user });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
