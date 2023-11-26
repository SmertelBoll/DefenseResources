import { body } from "express-validator";

export const formularCreateValidation = [
  body("nameOfTechnique", "Назва техніки повинна містити хоча б 2 символи").isLength({ min: 2 }).isString(),
  body("count", "кількість повинна бути додатнім числом").isInt({ min: 1 }),
  body("state").custom((value) => {
    if (
      ["Нова техніка", "Техніка в експлуатації", "Техніка потребує ремонту", "Знищене", "У резерві"].includes(
        value
      )
    ) {
      return true; // Значення "state" є допустимим
    } else {
      throw new Error("Неправильний стан");
    }
  }),
];
