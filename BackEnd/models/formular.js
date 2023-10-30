import mongoose from "mongoose";

const FormularSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // бо це користучав
      ref: "User",
      required: true,
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
    nameOfTechnique: {
      type: String, // тип поля
      required: true, // поле обов'язкове
    },
    count: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  {
    // при створенні чи оновленні зберігаємо час
    timestamps: true,
  }
);

export default mongoose.model("Formular", FormularSchema);
