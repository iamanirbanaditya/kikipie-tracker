import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    department: {
      type: String,
    },

    designation: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },

    password: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);