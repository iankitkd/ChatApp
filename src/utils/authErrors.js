const authErrorMessages = {
    // Sign-Up Errors
    "auth/email-already-in-use": "This email is already registered. Please log in.",
    "auth/invalid-email": "Invalid email format. Please check and try again.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/operation-not-allowed": "Sign-up is currently disabled. Try again later.",
  
    // Sign-In Errors
    "auth/user-not-found": "No account found with this email. Please sign up.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password. Please try again.",
    "auth/too-many-requests": "Too many failed attempts. Try again later.",
    "auth/user-disabled": "Your account has been disabled. Contact support.",
  
    // Logout Errors (Uncommon but possible)
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/internal-error": "An unexpected error occurred. Please try again.",
};

const getAuthErrorMessage = (errorCode) => {
    return authErrorMessages[errorCode] || "An unexpected error occurred. Please try again.";
};

export { authErrorMessages, getAuthErrorMessage };