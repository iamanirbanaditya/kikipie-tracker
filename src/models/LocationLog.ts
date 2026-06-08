import mongoose, { Schema } from "mongoose";

const LocationLogSchema = new Schema(
  {
    attendanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attendance",
      required: true,
    },

    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    accuracy: {
      type: Number,
      default: 0,
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.LocationLog ||
  mongoose.model(
    "LocationLog",
    LocationLogSchema
  );