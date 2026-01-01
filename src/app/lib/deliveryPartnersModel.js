import mongoose from "mongoose";

const deliveryPartnerModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const deliveryPartnersSchema =
  mongoose.models.deliverypartners ||
  mongoose.model("deliverypartners", deliveryPartnerModel);
