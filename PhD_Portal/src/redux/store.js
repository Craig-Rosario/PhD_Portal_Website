import { configureStore } from '@reduxjs/toolkit';
import personalDetailsReducer from './personalDetailsSlice';
import educationDetailsReducer from './educationDetailsSlice';
export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
    educationDetails: educationDetailsReducer,
  },
});
