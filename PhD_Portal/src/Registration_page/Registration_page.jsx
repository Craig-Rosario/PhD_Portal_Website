import {React, useState} from "react";
import Somaiya_Trust from "../assets/Somaiya_Trust.png";
import KJSSE from "../assets/SVU_KJSCE.png";
import Overview from "./Overview.jsx";
// import PersonalDetails from "./PersonalDetails";
// import EducationalDetails from "./EducationalDetails";
// import CourseDetails from "./CourseDetails";
// import UploadDocuments from "./UploadDocuments";



const Registration_page = ({ children }) => {

  const [activeTab, setActiveTab] = useState("overview");

  const components = {
    overview: <Overview />,
    // personalDetails: <PersonalDetails />,
    // educationalDetails: <EducationalDetails />,
    // courseDetails: <CourseDetails />,
    // uploadDocuments: <UploadDocuments />,
  };

  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-auto ">
      <div className="fixed w-full top-0 z-10 ">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <img src={KJSSE} alt="Somaiya Logo" className="h-10" />
        <h1 className="text-3xl font-bold text-[#B7202E]">Shodh Ganga</h1>
        <img src={Somaiya_Trust} alt="Somaiya Trust" className="h-10" />
      </header>

      {/* Navigation Bar */}
      <nav className="bg-gray-200 py-2 px-6 flex space-x-4 border-b border-b-[#B7202E] justify-center text-xl">
      <button className={`px-4 py-2 cursor-pointer hover:underline bg-[transparent] ${activeTab === "overview" ? " text-[#B7202E] " : "text-[#231F20] hover:text-[#004466]"}`} onClick={() => setActiveTab("overview")}>
        Overview
      </button>
      <button className={`px-4 py-2 cursor-pointer hover:underline bg-[transparent] ${activeTab === "personalDetails" ? " text-[#B7202E] " : "text-[#231F20] hover:text-[#004466]"}`} onClick={() => setActiveTab("personalDetails")}>
        Personal Details
      </button>
      <button className={`px-4 py-2 cursor-pointer hover:underline bg-[transparent] ${activeTab === "educationalDetails" ? " text-[#B7202E] " : "text-[#231F20] hover:text-[#004466]"}`} onClick={() => setActiveTab("educationalDetails")}>
        Educational Details
      </button>
      <button className={`px-4 py-2 cursor-pointer hover:underline bg-[transparent] ${activeTab === "courseDetails" ? " text-[#B7202E] " : "text-[#231F20] hover:text-[#004466]"}`} onClick={() => setActiveTab("courseDetails")}>
        Course Details
      </button>
      <button className={`px-4 py-2 cursor-pointer hover:underline bg-[transparent] ${activeTab === "uploadDocuments" ? " text-[#B7202E] " : "text-[#231F20] hover:text-[#004466]"}`} onClick={() => setActiveTab("uploadDocuments")}>
        Upload Documents
      </button>
      </nav>
      </div>
      {/* Main Content */}
      <main className="container mx-auto p-6 bg-white shadow-md rounded-lg mt-30">
        {components[activeTab]}
      </main>

    </div>
  );
};

export default Registration_page;
