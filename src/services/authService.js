import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
} from "firebase/auth";

import {auth} from '../config/firebase'

import toast from 'react-hot-toast';
import { getAuthErrorMessage } from "../utils/authErrors";
import { setLoading, setUser } from "../slices/authSlice";
import { createUser } from "./userService";


export const signUpService = (email, password, name, username, navigate) => async (dispatch) => {
  const toastId = toast.loading('Signing up...');
  dispatch(setLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const {uid, photoURL} = userCredential.user;
    await createUser(uid, email, name, username, photoURL);
    dispatch(setUser({uid, email, name, username, photoURL}));
    toast.dismiss(toastId);
    toast.success("Account created successfully!");
    navigate("/dashboard");
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error.code);
    toast.dismiss(toastId);
    toast.error(errorMessage);
  }
  dispatch(setLoading(false));
};

export const logInService = (email, password, navigate) => async (dispatch) => {
  const toastId = toast.loading('Signing in...');
  dispatch(setLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.dismiss(toastId);
    toast.success("Sign in successfully!");
    const {uid, email:userEmail, displayName, photoURL} = userCredential.user;
    dispatch(setUser({uid, userEmail, displayName, photoURL}));
    navigate("/dashboard");
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error.code);
    toast.dismiss(toastId);
    toast.error(errorMessage);
  }
  dispatch(setLoading(false));
};

export const logoutService = (navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await signOut(auth);
    dispatch(setUser(null));
    localStorage.removeItem("user");
    toast.success("Sign out successfully!");
    navigate("/login");
  } catch (error) {
    const errorMessage = getAuthErrorMessage(error.code);
    toast.error(errorMessage)
  }
  dispatch(setLoading(false));
};
