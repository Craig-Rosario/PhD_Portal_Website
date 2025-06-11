import {React, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import LandingPage from './Landing_page/Landing_page.jsx' 
import LoginPage from "./Login_page/Login_page.jsx";
import RegistrationPage from "./Registration_page/Registration_page.jsx";
import StudentDashboard from './Portal/Dashboard/StudentDashboard.jsx';
import StudentLayout from './Portal/StudentLayout.jsx';

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  
  return(
    <Router>
      <div className="relative h-screen w-screen overflow-auto scroll-smooth font-[Marcellus]">
      
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={
            <>
              {showLanding && <LandingPage onContinue={() => setShowLanding(false)} />}
              {!showLanding && <LoginPage />}
            </>}
          />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
