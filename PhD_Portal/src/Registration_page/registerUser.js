import axios from 'axios';

export const registerUser = async (getState) => {
  const state = getState();
  const personalData = state.personalDetails;
  const academicData = state.academic;
  const employmentData = state.employment;

  try {
    await axios.post('http://localhost:5000/api/personal', personalData);
    await axios.post('http://localhost:5000/api/academic', academicData);
    await axios.post('http://localhost:5000/api/employment', employmentData);

    alert("Registration submitted successfully!");
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Failed to submit registration. Please try again.");
  }
};
