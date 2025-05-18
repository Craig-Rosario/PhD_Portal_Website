import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: "",
  firstName: "",
  middleName: "",
  lastName: "",
  motherName: "",
  fatherName: "",
  addressLine1: "",
  addressLine2: "",
  district: "",
  state: "",
  pinCode: "",
  gender: "",
  aadhar: "",
  maritalStatus: "",
  mobile: "",
  altMobile: "",
  email: "",
  altEmail: "",
};

const personalDetailsSlice = createSlice({
  name: 'personalDetails',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
    setAllFields: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { updateField, resetForm, setAllFields } = personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;
