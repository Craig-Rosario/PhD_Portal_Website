import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  undergradDegrees: [],
  postgradDegrees: [],
  employmentRecords: [],
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    addUG: (state, action) => {
      state.undergradDegrees.push(action.payload);
    },
    deleteUG: (state, action) => {
      state.undergradDegrees.splice(action.payload, 1);
    },
    addPG: (state, action) => {
      state.postgradDegrees.push(action.payload);
    },
    deletePG: (state, action) => {
      state.postgradDegrees.splice(action.payload, 1);
    },
    addEmployment: (state, action) => {
      state.employmentRecords.push(action.payload);
    },
    deleteEmployment: (state, action) => {
      state.employmentRecords.splice(action.payload, 1);
    },
  },
});

export const {
  addUG, deleteUG,
  addPG, deletePG,
  addEmployment, deleteEmployment,
} = educationSlice.actions;

export default educationSlice.reducer;
