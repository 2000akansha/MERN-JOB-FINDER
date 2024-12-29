// authService.js

import { getAuth, fetchSignInMethodsForEmail, sendSignInLinkToEmail as firebaseSendSignInLinkToEmail } from 'firebase/auth';
import { auth } from './firebase';

const authInstance = getAuth();

// Function to check if email exists
export const checkIfEmailExists = async (email) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(authInstance, email);
    return signInMethods.length > 0;
  } catch (error) {
    console.error('Error checking if email exists:', error);
    return false; // Return false in case of any errors
  }
};

// Function to send sign-in link to email
export const sendSignInLinkToEmail = async (email) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/login1', // Replace with your actual login page URL
    handleCodeInApp: true,
  };

  try {
    await firebaseSendSignInLinkToEmail(authInstance, email, actionCodeSettings);
    console.log('Verification link sent!'); // Log success for debugging
    // Optionally redirect user after alerting them
  } catch (error) {
    console.error('Error sending sign-in link:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
