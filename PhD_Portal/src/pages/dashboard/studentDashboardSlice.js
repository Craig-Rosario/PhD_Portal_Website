// src/features/dashboard/studentDashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentInfo: null,
  courses: [],
  assignments: [],
  announcements: [],
  schedule: [],
  progress: [],
};

const studentDashboardSlice = createSlice({
  name: "studentDashboard",
  initialState,
  reducers: {
    setStudentInfo: (state, action) => {
      state.studentInfo = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    setAnnouncements: (state, action) => {
      state.announcements = action.payload;
    },
    setSchedule: (state, action) => {
      state.schedule = action.payload;  
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const {
  setStudentInfo,
  setCourses,
  setAssignments,
  setAnnouncements,
  setSchedule,
  setProgress,
} = studentDashboardSlice.actions;

export default studentDashboardSlice.reducer;
