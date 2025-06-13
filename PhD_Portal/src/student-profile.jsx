"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Calendar, Phone, Mail, GraduationCap, BookOpen, FileText, Menu, X } from "lucide-react"
import { Briefcase } from "lucide-react";


export default function StudentProfile() {
  const [activeSection, setActiveSection] = useState("personal")
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 200; // Matches the visible height pushed by fixed + sticky content
      const elementPosition = window.pageYOffset + element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
      setIsMobileNavOpen(false);
    }
  };

  

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["personal", "educational", "program"]
      const scrollPosition = window.scrollY + 280

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-4xl font-normal font-[Marcellus]" style={{ color: '#B7202E' }}>Shodh Ganga</h1>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 overflow-hidden">
              <img
                src="assets/SVU_KJSCE.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </header>

      <div className="flex pt-20">
        {/* Left Sidebar - Placeholder */}
        <div className="hidden lg:block w-16 bg-[#B7202E] min-h-screen fixed left-0 top-20">
          <div className="flex flex-col items-center py-4 space-y-4">
            <div className="w-8 h-8 bg-white/20 rounded"></div>
            <div className="w-8 h-8 bg-white/20 rounded"></div>
            <div className="w-8 h-8 bg-white/20 rounded"></div>
            <div className="w-8 h-8 bg-white/20 rounded"></div>
          </div>
        </div>

        <div className="flex-1 lg:ml-16  p-4 space-y-6 lg:pr-16">
          

            {/* Header */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Student Profile</h1>

            {/* Fixed Student Profile Card (Full width) */}
            <div className="sticky top-4 z-10">
              <Card className="w-full p-0 overflow-hidden rounded-lg shadow">
                {/* Top red section */}
                <div className="bg-[#B7202E] text-white p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Avatar overlapping both sections */}
                    <Avatar className="w-24 h-24 border-4 border-white bg-white">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                      <AvatarFallback className="bg-blue-500 text-white text-2xl">SV</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">Mr. Random</h2>
                      <p className="text-lg mb-1">K. J. Somaiya School Of Engineering</p>
                      <p className="text-base mb-0">Second Year B.Tech Computer Engineering</p>
                    </div>
                  </div>
                </div>

                {/* Bottom white section (25%) */}
                <div className="bg-white text-black px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-black" />
                      <span>1600</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-black" />
                      <span>24/06/2005</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-black" />
                      <span>1234567890</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-black" />
                      <span className="truncate">Random@somaiya.edu</span>
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          <div className="p-4 space-y-6 pr-0 lg:pr-64 ">


            {/* Personal Details Section */}
            <section id="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                      <p className="text-gray-900">something</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                      <p className="text-gray-900">something</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <p className="text-gray-900">Male</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                      <p className="text-gray-900">Unmarried</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                      <p className="text-gray-900">XXXXXXXX1234</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nearest Railway Station</label>
                      <p className="text-gray-900">Vidyavihar Station</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address</label>
                      <div className="text-gray-900 space-y-1">
                        <p>Flat No. , Building Name</p>
                        <p>Land Mark, Street Name</p>
                        <p>Area, State, Pin Code - 400077</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Address</label>
                      <div className="text-gray-900 space-y-1">
                        <p>Flat No., Building Name</p>
                        <p>Land Mark, Street Name</p>
                        <p>Area, State, Pin Code - 4000</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <p className="text-gray-900">1234567890</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Mobile</label>
                      <p className="text-gray-900">1234567890</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Email</label>
                      <p className="text-gray-900">abc@gmail.com</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Email</label>
                      <p className="text-gray-900">abc@gmail.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Educational Details Section */}
            <section id="educational">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="w-5 h-5" />
                    <span>Educational Details</span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                  {/* UG Block */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Undergraduate Or Equivalent</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-gray-600">Degree Name</p>
                        <p className="font-medium text-black">Bachelors Of Technology (B. Tech)</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Institute Name</p>
                        <p className="font-medium text-black">K. J. Somaiya School Of Engineering</p>
                      </div>
                      <div>
                        <p className="text-gray-600">University Name</p>
                        <p className="font-medium text-black">Somaiya Vidyavihar University</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Year Of Passing</p>
                        <p className="font-medium text-black">2021</p>
                      </div>
                    </div>
                  </div>

                  {/* PG Block */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Postgraduate Or Equivalent</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-gray-600">Degree Name</p>
                        <p className="font-medium text-black">Masters Of Technology (M. Tech)</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Institute Name</p>
                        <p className="font-medium text-black">K. J. Somaiya School Of Engineering</p>
                      </div>
                      <div>
                        <p className="text-gray-600">University Name</p>
                        <p className="font-medium text-black">Somaiya Vidyavihar University</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Year Of Passing</p>
                        <p className="font-medium text-black">2023</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Employment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-gray-600">Designation</p>
                        <p className="font-medium text-black">Full Stack Web Developer</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Organization Name</p>
                        <p className="font-medium text-black">K. J. Somaiya School Of Engineering</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Duration</p>
                        <p className="font-medium text-black">10mo 20 d (05/24 to 01/25)</p>
                      </div>
                        </div>
                  </div>
                 
                </CardContent>
              </Card>

              
            </section>

            {/* Program Details Section */}
            <section id="program">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Program Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <p className="text-gray-900">Computer Engineering</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year of Admission</label>
                      <p className="text-gray-900">2022</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Semester</label>
                      <p className="text-gray-900">4th Semester</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guide Name</label>
                      <p className="text-gray-900">Dr. Rajesh Kumar</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Guide Email</label>
                      <p className="text-gray-900">rajesh.kumar@somaiya.edu</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Undergoing
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Domain of Research</label>
                      <p className="text-gray-900">Artificial Intelligence and Machine Learning</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Topic of Research</label>
                      <p className="text-gray-900">Deep Learning Applications in Computer Vision</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"> Research Description</label>
                    <p className="text-gray-700 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bonds wih Institute</label>
                    <p className="text-gray-700 leading-relaxed">
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                      est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                      laudantium.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship</label>
                    <p className="text-gray-700 leading-relaxed">
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                    </p>
                  </div>

                  
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        
        
        {/* Right Sidebar Navigation */}
        <div className="hidden lg:block fixed right-4 top-[390px] w-64 h-[40vh] bg-white shadow-lg border border-gray-300 border-b-4 border-b-gray-300 rounded-md overflow-auto">
          <div className="p-4">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "personal"
                    ? "bg-gray-100 text-[#ED1C24]"
                    : "text-black"
                } hover:bg-gray-100`}
                onClick={() => scrollToSection("personal")}
              >
                <User
                  className={`w-4 h-4 mr-2 ${
                    activeSection === "personal" ? "text-[#ED1C24]" : "text-black"
                  }`}
                />
                Personal Details
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "educational"
                    ? "bg-gray-100 text-[#ED1C24]"
                    : "text-black"
                } hover:bg-gray-100`}
                onClick={() => scrollToSection("educational")}
              >
                <GraduationCap
                  className={`w-4 h-4 mr-2 ${
                    activeSection === "educational" ? "text-[#ED1C24]" : "text-black"
                  }`}
                />
                Educational Details
              </Button>

              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeSection === "program"
                    ? "bg-gray-100 text-[#ED1C24]"
                    : "text-black"
                } hover:bg-gray-100`}
                onClick={() => scrollToSection("program")}
              >
                <BookOpen
                  className={`w-4 h-4 mr-2 ${
                    activeSection === "program" ? "text-[#ED1C24]" : "text-black"
                  }`}
                />
                Program Details
              </Button>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <Button className="lg:hidden fixed bottom-4 right-4 z-50" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>

        {/* Mobile Navigation Menu */}
        {isMobileNavOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <div
              className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-gray-800 mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                <Button
                  variant={activeSection === "personal" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => scrollToSection("personal")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Personal Details
                </Button>
                <Button
                  variant={activeSection === "educational" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => scrollToSection("educational")}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Educational Details
                </Button>
                <Button
                  variant={activeSection === "program" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => scrollToSection("program")}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Program Details
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
