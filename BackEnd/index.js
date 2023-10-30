import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import { loginValidation, registerValidation, updateValidation } from "./validations/auth.js";
import { checkValidationError } from "./utils/checkValidationError.js";
import { getMe, loginUser, registerUser, updateUser } from "./controllers/userControllers.js";
import { checkAuth } from "./utils/checkAuth.js";

import { uploadFile } from "./controllers/imageControllers.js";
import { formularCreateValidation } from "./validations/formular.js";
import {
  createFormular,
  getAllFormulars,
  getFilteredFormular,
  getUniqueMilitaryBase,
} from "./controllers/formularControllers.js";

// підключаємось до бази даних
const mongoConnection = process.env.MONGO_CONNECTION;
mongoose
  .connect(mongoConnection)
  // перевіряємо підключення
  .then(() => {
    console.log("DB ok");
  })
  // якщо помилка
  .catch((err) => {
    console.log("DB error", err);
  });

// Створюємо програму
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    // помилки, куди загружати
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});
const upload = multer({ storage });

// Настройки
// app.use(express.json()); // дозволяє читати json
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use("/uploads", express.static("uploads")); // щоб діставати статичні файли з папки (в гугл наприклад)

// Запроси
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/auth/register", registerValidation, checkValidationError, registerUser);
app.post("/auth/login", loginValidation, checkValidationError, loginUser);
app.get("/auth/me", checkAuth, getMe);
app.patch("/auth/update", checkAuth, updateValidation, checkValidationError, updateUser);

app.post("/upload", upload.single("image"), uploadFile);

app.post("/formular", checkAuth, formularCreateValidation, checkValidationError, createFormular);
app.get("/formular/:militaryBase", getUniqueMilitaryBase);
app.post("/formular/filtered", checkAuth, getFilteredFormular);
app.get("/formular", checkAuth, getAllFormulars);

// на якому хості запускаємо, функція що робити якщо помилка
app.listen(4444, (err) => {
  if (err) {
    console.log("server error");
    console.log(err);
  }

  console.log("server ok");
});
