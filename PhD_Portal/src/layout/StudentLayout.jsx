// src/Portal/StudentLayout.jsx

import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/custom/sidebar/StudentSidebar";
import somaiyaLogo from "../assets/SVU_KJSCE.png";
import trustLogo from "../assets/Somaiya_Trust.png";
import HeaderLayout from "./HeaderLayout";

export default function StudentLayout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Header */}
        {/* <header className="w-full h-16 flex items-center border-b-2 border-red-600 bg-white px-4 shadow-sm fixed top-0 left-0 z-50">
          <div className="flex items-center flex-row justify-between w-full">
            <img src={somaiyaLogo} alt="Somaiya Logo" className="h-12" />
            <h1 className="text-xl font-semibold text-red-800 text-center">Shodh Ganga</h1>
            <img src={trustLogo} alt="Trust Logo" className="h-10" />
          </div>
        </header> */}

        {/* Body Wrapper (includes sidebar and main content) */}
        <div className="flex flex-1 pt-16">
          {/* Sidebar (starts *below* the header) */}
          <StudentSidebar />
          <HeaderLayout/>
          {/* Main Content */}
          <main className="flex-1 relative overflow-y-auto">
            
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

