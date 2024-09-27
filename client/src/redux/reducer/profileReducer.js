import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  error: null,
};

export const profileReducer = createReducer(initialState,(builder)=>{
    builder
    .addCase("updateProfileRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProfileSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProfileFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("changePasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("changePasswordSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("changePasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateProfilePictureRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateProfilePictureSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateProfilePictureFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("clearError", (state) => {
      state.error = null;
    })
    .addCase("clearMessage", (state) => {
      state.message = null;
    })
  });