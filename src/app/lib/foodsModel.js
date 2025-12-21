import mongoose from "mongoose";

const foodmodel = new mongoose.Schema(
  {
    name: String,
    price: Number,
    img_path: String,
    description: String,
    resto_id: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

export const foodSchema =
  mongoose.models.foods || mongoose.model("foods", foodmodel);
