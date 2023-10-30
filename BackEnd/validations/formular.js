import { body } from "express-validator";

export const formularCreateValidation = [
  body("nameOfTechnique", "Name must contain at least 2 characters").isLength({ min: 2 }).isString(),
  body("count", "The quantity must be a positive number").isInt({ min: 1 }),
  body("state").custom((value) => {
    if (
      ["New equipment", "Equipment in use", "Equipment Needs repair", "Destroyed", "Inactive"].includes(value)
    ) {
      return true; // Значення "state" є допустимим
    } else {
      throw new Error("Invalid state");
    }
  }),
];
