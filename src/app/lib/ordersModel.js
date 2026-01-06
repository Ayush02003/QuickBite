import mongoose from "mongoose";

const orderModel = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },

    resto_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "restaurants",
    },

    items: [
      {
        food_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "foods",
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    deliveryBoy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "delivery_boys",
      default: null,
    },

    status: {
      type: String,
      default: "Pending", 
    },
  },
  {
    timestamps: true,
  }
);

export const orderSchema =
  mongoose.models.order || mongoose.model("order", orderModel);
