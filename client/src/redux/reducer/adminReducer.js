import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  error: null,
};

export const adminReducer = createReducer(initialState,(builder)=>{
    builder
    .addCase("adminStatsRequest", (state) => {
      state.loading = true;
    })
    .addCase("adminStatsSuccess", (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionCount = action.payload.subscriptionCount;
      state.usersCount = action.payload.usersCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.usersPercentage = action.payload.usersPercentage;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.viewsProfit = action.payload.viewsProfit;
      state.usersProfit = action.payload.usersProfit;
    })
    .addCase("adminStatsFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("allUsersRequest", (state) => {
      state.loading = true;
    })
    .addCase("allUsersSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase("allUsersFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteUserSuccess", (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase("deleteUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("updateUserRoleRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserRoleSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("updateUserRoleFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("createCourseRequest", (state) => {
      state.loading = true;
    })
    .addCase("createCourseSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("createCourseFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("deleteCourseRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteCourseSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteCourseFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("addLectureRequest", (state) => {
      state.loading = true;
    })
    .addCase("addLectureSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("addLectureFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("deleteLectureRequest", (state) => {
      state.loading = true;
    })
    .addCase("deleteLectureSuccess", (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase("deleteLectureFail", (state, action) => {
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