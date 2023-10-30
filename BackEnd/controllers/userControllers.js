import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

import UserModel from "../models/user.js";

const bcrypt_salt = process.env.BCRYPT_SALT;
const jwt_key = process.env.JWT_KEY;

export const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(parseInt(bcrypt_salt)); // шифрування
    const hash = await bcrypt.hash(password, salt);

    const avatar = req.body.avatar;

    // regiment → battalion → company → platoon → section
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      regiment: req.body.regiment.toLowerCase(),
      battalion: req.body.battalion.toLowerCase(),
      company: req.body.company.toLowerCase(),
      platoon: req.body.platoon.toLowerCase(),
      section: req.body.section.toLowerCase(),
      avatar: avatar ? avatar : "",
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      jwt_key, // ключ шифрування
      {
        expiresIn: "30d", // скільки токен буде існувати
      }
    );

    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ title: "Authorization error", message: "the user with this email is already registered" });
    }
    res.status(500).json({ title: "Authorization error", message: "failed to register" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(404).json({ title: "Authorization error", message: "user not found" });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(400).json({ title: "Authorization error", message: "wrong login or password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      jwt_key, // ключ шифрування
      {
        expiresIn: "30d", // скільки токен буде існувати
      }
    );

    // повертаємо дані
    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ title: "Authorization error", message: "failed to authenticate" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).exec();

    if (!user) {
      return res.status(404).json({ title: "Authorization error", message: "user not found" });
    }

    res.json({
      ...user._doc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ title: "Authorization error", message: "failed to get data" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { fullName, regiment, battalion, company, platoon, section } = req.body;
    const user = await UserModel.findById(req.userId);

    // Оновлюєм поля
    user.fullName = fullName;
    user.regiment = regiment.toLowerCase();
    user.battalion = battalion.toLowerCase();
    user.company = company.toLowerCase();
    user.platoon = platoon.toLowerCase();
    user.section = section.toLowerCase();

    // Зберігаємо оновленого користувача
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ title: "Update error", message: "failed to update data" });
  }
};
