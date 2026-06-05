import mongoose, { Schema } from "mongoose";

const AttendanceSchema = new Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    loginTime: Date,

    logoutTime: Date,

    status: {
      type: String,
      enum: [
        "Pending",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },

    totalKm: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Attendance ||
  mongoose.model(
    "Attendance",
    AttendanceSchema
  );