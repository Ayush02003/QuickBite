import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,   
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant =
  mongoose.models.restaurants ||
  mongoose.model("restaurants", restaurantSchema);

export default Restaurant;
