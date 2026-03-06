import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
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

    const full_name = first_name + " " + last_name;

    await User.create({
      full_name,
      username,
      email,
      password: hash,
      image_url:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    });

    return res
      .status(201)
      .json({ message: "Registration successful", type: "OK" });
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

    const payload = {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      image_url: user.image_url,
    };

    const token = jwt.sign(payload, "clave_super_secreta");

    return res
      .status(200)
      .json({ message: "You have successfully logged in.", token, type: "OK" });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
