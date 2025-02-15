import {React, useState} from 'react'
import './App.css'
import LandingPage from './Landing_page/Landing_page.jsx' 
import LoginPage from "./Login_page/Login_page.jsx";

const App = () => {
  const [showLanding, setShowLanding] = useState(true);
  
  return(
    <div className="relative h-screen w-screen overflow-hidden">
    {showLanding && <LandingPage onContinue={() => setShowLanding(false)} />}
    {!showLanding && <LoginPage />}
    </div>
  );
};

export default App;
