import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String, // тип поля
      required: true, // поле обов'язкове
    },
    email: {
      type: String,
      required: true,
      unique: true, // повинно бути унікальним
    },
    regiment: {
      type: String,
      required: true,
    },
    battalion: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    platoon: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    accessLevel: {
      type: String,
      default: "ordinary",
    },
    avatar: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // при створенні чи оновленні зберігаємо час
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
