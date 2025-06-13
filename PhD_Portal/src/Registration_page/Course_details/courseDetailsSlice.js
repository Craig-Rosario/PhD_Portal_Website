// src/features/courseDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to submit course details to backend (optional)
export const submitCourseDetails = createAsyncThunk(
  'courseDetails/submitCourseDetails',
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/course', courseData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const courseDetailsSlice = createSlice({
  name: 'courseDetails',
  initialState: {
    department: '',
    institute: '',
    enrollmentYear: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    setDepartment(state, action) {
      state.department = action.payload;
    },
    setInstitute(state, action) {
      state.institute = action.payload;
    },
    setEnrollmentYear(state, action) {
      state.enrollmentYear = action.payload;
    },
    resetCourseDetails(state) {
      state.department = '';
      state.institute = '';
      state.enrollmentYear = '';
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCourseDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitCourseDetails.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitCourseDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setDepartment, setInstitute, setEnrollmentYear, resetCourseDetails } = courseDetailsSlice.actions;

export default courseDetailsSlice.reducer;
