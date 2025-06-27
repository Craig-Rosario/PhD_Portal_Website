import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css'
import LandingPage from './pages/landing-page/LandingPage.jsx' 
import LoginPage from "./pages/login-page/LoginPage.jsx";
import RegistrationPage from "./Registration_page/Registration_page.jsx";
import StudentDashboard from './pages/dashboard/StudentDashboard.jsx';
import StudentLayout from './layout/StudentLayout.jsx';
import AllCourses from './pages/my-courses/AllCourses.jsx';
import AllCourseDetails from './pages/my-courses/AllCourseDetails.jsx';
import LearningGuides from './pages/my-courses/LearningGuides.jsx';

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
            <Route path="dashboard" element={<StudentDashboard />}/>
            <Route path='courses' element={<AllCourses/>}/>
            <Route path='courses/details' element={<AllCourseDetails/>}/>
            <Route path='courses/details/learning-guides' element={<LearningGuides/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
