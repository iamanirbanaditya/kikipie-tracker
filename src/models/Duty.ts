import mongoose, { Schema } from "mongoose";

const DutySchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    loginTime: Date,

    logoutTime: Date,

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Duty ||
  mongoose.model("Duty", DutySchema);