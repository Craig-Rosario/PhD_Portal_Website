import { configureStore } from '@reduxjs/toolkit';
import personalDetailsReducer from '../Registration_page/Personal_details/personalDetailsSlice';
import educationDetailsReducer from '../Registration_page/Educational_details/educationDetailsSlice';
export const store = configureStore({
  reducer: {
    personalDetails: personalDetailsReducer,
    educationDetails: educationDetailsReducer,
  },
});
