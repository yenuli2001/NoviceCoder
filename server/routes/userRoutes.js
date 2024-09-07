import express from "express";



import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userControllers.js";

import { authorizeAdmin, isAuthenticated } from "../middlewars/auth.js";
import singleUpload from "../middlewars/multer.js";

const router = express.Router();

//Register new user
router.post("/register", singleUpload, register);

//Login
router.post("/login", login);

//Logout
router.get("/logout", logout);

//Get my profile
router.get("/me", isAuthenticated, getProfile);

//Delete my profile
router.delete("/me", isAuthenticated, deleteMyProfile);

//change Password
router.put("/changepassword", isAuthenticated, changePassword);

//Update Profile
router.put("/updateProfile", isAuthenticated, updateProfile);

//Update Profile Picture
router.put(
  "/updateProfilepicture",
  isAuthenticated,
  singleUpload,
  updateProfilePicture
);

//Forget Password
router.post("/forgetpassword", forgetPassword);

//Reset Password
router.put("/resetpassword/:token", resetPassword);

//Add to playlist
router.post("/addtoplaylist", isAuthenticated, addToPlaylist);

//remove from playlist
router.delete("/removefromplaylist", isAuthenticated, removeFromPlaylist);

//Admin

//Get all user
router.get("/admin/users", isAuthenticated, authorizeAdmin, getAllUsers);

//Update User role
router.put("/admin/user/:id", isAuthenticated, authorizeAdmin, updateUserRole);

//delete User
router.delete("/admin/user/:id", isAuthenticated, authorizeAdmin, deleteUser);

//Get the dashboard stats




export default router;
