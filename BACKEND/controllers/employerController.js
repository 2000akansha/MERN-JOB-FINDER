import { catchAsyncErrors } from "../middlewares/catchAsyncerror.js";
import { Emp } from "../models/employerSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  console.log("Registration request received:", req.body);

  if (!name || !email || !phone || !password) {
    console.error("Form validation failed: Missing required fields.");
    return next(new ErrorHandler("Please fill full form!"));
  }

  const isEmail = await Emp.findOne({ email });
  if (isEmail) {
    console.error("Email already registered:", email);
    return next(new ErrorHandler("Email already registered!"));
  }

  try {
    const user1 = await Emp.create({
      name,
      email,
      phone,
      password,
      role,
    });

    console.log("User registered successfully:", user1);

    sendToken(user1, 201, res, "Employer Registered!");
  } catch (error) {
    console.error("Error creating user:", error);
    return next(new ErrorHandler("User registration failed."));
  }
});

// employerController.js
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password.", 400));
  }
  const user1 = await Emp.findOne({ email }).select("+password");
  if (!user1) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user1.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  // Assuming you have a function to generate JWT token
  sendToken(user1, 201, res, "Employer Logged In!"); // Updated variable name from user to user2
});


export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: " Employer Logged Out Successfully.",
    });
});


export const getUser1 = catchAsyncErrors((req, res, next) => {
  const user = req.user1;
  res.status(200).json({
    success: true,
    user,
  });
});