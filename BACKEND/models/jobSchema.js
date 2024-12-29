import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 characters!"],
    maxLength: [30, "Title cannot exceed 30 characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
    minLength: [5, "Description must contain at least 30 characters!"],
    maxLength: [500, "Description cannot exceed 500 characters!"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide a location."],
    minLength: [2, "Location must contain at least 2 characters!"],
  },
  fixedSalary: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 999999999"],
  },
  salaryFrom: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 999999999"],
  },
  salaryTo: {
    type: Number,
    min: [1000, "Salary must be at least 1000"],
    max: [999999999, "Salary cannot exceed 999999999"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

jobSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const Job = mongoose.model("Job", jobSchema);
