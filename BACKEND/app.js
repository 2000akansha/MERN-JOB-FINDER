// import express from "express";
// import { dbConnection } from "./database/dbConnection.js";
// import jobRouter from "./routes/jobRoutes.js";
// import employerRouter from "./routes/employerRoutes.js";
// import jobseekerRouter from "./routes/jobseekerRoutes.js";
// import applicationRouter from "./routes/applicationRoutes.js";
// import { config } from "dotenv";
// import cors from "cors";
// import { errorMiddleware } from "./middlewares/error.js";
// import cookieParser from "cookie-parser";
// import fileUpload from "express-fileupload";
// import axios from "axios";
// import braintree from "braintree"; // Import Braintree

// const app = express();
// config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: true,
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ZeroBounce API key from environment variables
// const ZEROBOUNCE_API_KEY = process.env.ZEROBOUNCE_API_KEY;

// // Braintree configuration
// const gateway = new braintree.BraintreeGateway({
//   environment: braintree.Environment.Sandbox, // Change to Production when ready
//   merchantId: process.env.BRAINTREE_MERCHANT_ID,
//   publicKey: process.env.BRAINTREE_PUBLIC_KEY,
//   privateKey: process.env.BRAINTREE_PRIVATE_KEY
// });

// // Route to generate Braintree client token
// app.get("/api/braintree/token", (req, res) => {
//   gateway.clientToken.generate({}, (err, response) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.send(response.clientToken);
//     }
//   });
// });

// // Route to handle Braintree transactions
// app.post("/api/braintree/checkout", (req, res) => {
//   const nonceFromTheClient = req.body.paymentMethodNonce;
//   const amount = parseFloat(req.body.amount); // amount to charge

//   // Validate amount
//   if (isNaN(amount) || amount <= 0) {
//     return res.status(400).json({ message: "Invalid amount. Amount must be greater than zero." });
//   }

//   gateway.transaction.sale({
//     amount: amount.toString(),
//     paymentMethodNonce: nonceFromTheClient,
//     options: {
//       submitForSettlement: true
//     }
//   }, (err, result) => {
//     if (err || !result.success) {
//       res.status(500).send(err || result.message);
//     } else {
//       res.send(result);
//     }
//   });
// });

// // Dummy user data store
// const users = [];

// // Check if email exists
// const checkIfEmailExists = (email) => {
//   return users.some(user => user.email === email);
// };

// // Validate if email is a valid Gmail account
// const isValidGmailAccount = async (email) => {
//   try {
//     const response = await axios.get(`https://api.zerobounce.net/v2/validate?api_key=${ZEROBOUNCE_API_KEY}&email=${email}`);
//     return response.data.status === 'valid' && email.endsWith('@gmail.com');
//   } catch (error) {
//     console.error('Email validation error:', error);
//     return false;
//   }
// };

// // Register route
// app.post('/api/v1/user1/register1', async (req, res) => {
//   const { name, phone, email, role, password } = req.body;

//   // Check if email is valid Gmail account
//   const isGmailValid = await isValidGmailAccount(email);
//   if (!isGmailValid) {
//     return res.status(400).json({ message: 'Email Invalid' });
//   }

//   // Check if email already exists
//   if (checkIfEmailExists(email)) {
//     return res.status(400).json({ message: 'This email already exists. Please use a different email address.' });
//   }

//   // Register user
//   const newUser = { name, phone, email, role, password };
//   users.push(newUser);

//   // Simulate sending verification link to email
//   // Replace this with actual email sending logic
//   console.log(`Verification link sent to: ${email}`);

//   res.status(201).json({ message: 'Registration successful. Verification link sent to email.' });
// });

// // Route to check if email exists
// app.post('/api/v1/user1/check-email', (req, res) => {
//   const { email } = req.body;
//   const exists = checkIfEmailExists(email);
//   res.json({ exists });
// });

// // Route to validate email
// app.post('/api/v1/user1/validate-email', async (req, res) => {
//   const { email } = req.body;
//   const isValid = await isValidGmailAccount(email);
//   res.json({ isValid });
// });

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );
// app.use("/api/v1/user1", employerRouter);
// app.use("/api/v1/user2", jobseekerRouter);
// app.use("/api/v1/job", jobRouter);
// app.use("/api/v1/application", applicationRouter);
// dbConnection();

// app.use(errorMiddleware);

// export default app;



import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import employerRouter from "./routes/employerRoutes.js";
import jobseekerRouter from "./routes/jobseekerRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config/config.env" });

// Middleware setup
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/user1", employerRouter);
app.use("/api/v1/user2", jobseekerRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// Database connection
dbConnection();

// Error middleware
app.use(errorMiddleware);

export default app;
