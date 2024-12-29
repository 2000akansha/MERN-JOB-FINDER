import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyAKznxY_--EfK6phP-DLYXDqrImqDmodBg",
  authDomain: "job-finder-2024-d6c90.firebaseapp.com",
//   databaseURL: "https://job-finder-2024-d6c90-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "job-finder-2024-d6c90",
  storageBucket: "job-finder-2024-d6c90.appspot.com",
  messagingSenderId: "342543296301",
  appId: "1:342543296301:web:6e6f643cfce19c883f15a4",
//   measurementId: "G-71KGY94QMQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional, if you're using Analytics

// If you need to use Auth
const auth = getAuth(); // Use getAuth() directly

export { app, analytics, auth }; 