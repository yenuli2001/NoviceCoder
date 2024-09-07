import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer({ courses: [], lectures: [] }, (builder) => {
    builder
        .addCase("allCoursesRequest", (state) => {
            state.loading = true;
        })
        .addCase("allCoursesSuccess", (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        })
        .addCase("allCoursesFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("allLecturesRequest", (state) => {
            state.loading = true;
        })
        .addCase("allLecturesSuccess", (state, action) => {
            state.loading = false;
            state.lectures = action.payload;
        })
        .addCase("allLecturesFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("addToPlaylistRequest", (state) => {
            state.loading = true;
        })
        .addCase("addToPlaylistSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("addToPlaylistFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("removeFromPlaylistRequest", (state) => {
            state.loading = true;
        })
        .addCase("removeFromPlaylistSuccess", (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase("removeFromplaylistFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("clearError", (state) => {
            state.error = null;
        })
        .addCase("clearMessage", (state) => {
            state.message = null;
        });
});
