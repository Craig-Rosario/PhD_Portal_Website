import React, { useState, useRef } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

const EducationalDetails = ({ setActiveTab }) => {
  const [undergradDegrees, setUndergradDegrees] = useState([]);
  const [postgradDegrees, setPostgradDegrees] = useState([]);
  const [employmentRecords, setEmploymentRecords] = useState([]);

  const [ugForm, setUgForm] = useState({ title: "", institute: "", university: "", year: "" });
  const [pgForm, setPgForm] = useState({ title: "", institute: "", university: "", year: "" });
  const [employmentForm, setEmploymentForm] = useState({ designation: "", organization: "", duration: "", startDate: "", endDate: "" });

  const tableRef = useRef(null);

  // date range for year of passing
  const currentYear = new Date().getFullYear();
  const startYear = 1960;
  const endYear = currentYear; // Customize as needed
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  // Function to add UG degree
  const addUndergradDegree = () => {
    if (ugForm.title && ugForm.institute && ugForm.university && ugForm.year) {
      setUndergradDegrees([...undergradDegrees, ugForm]);
      setUgForm({ title: "", institute: "", university: "", year: "" });
    }
  };

  // Function to add PG degree
  const addPostgradDegree = () => {
    if (pgForm.title && pgForm.institute && pgForm.university && pgForm.year) {
      setPostgradDegrees([...postgradDegrees, pgForm]);
      setPgForm({ title: "", institute: "", university: "", year: "" });
    }
  };

  // Function to add employment
  const addEmployment = () => {
    if (employmentForm.designation && employmentForm.organization && employmentForm.startDate && employmentForm.endDate) {
      setEmploymentRecords([...employmentRecords, employmentForm]);
      setEmploymentForm({ designation: "", organization: "", duration: "", startDate: "", endDate: "" });
    }
  };

  // Function to delete UG entry
  const deleteUndergrad = (index) => {
    setUndergradDegrees(undergradDegrees.filter((_, i) => i !== index));
  };

  // Function to delete PG entry
  const deletePostgrad = (index) => {
    setPostgradDegrees(postgradDegrees.filter((_, i) => i !== index));
  };

  // Function to delete employment entry
  const deleteEmployment = (index) => {
    setEmploymentRecords(employmentRecords.filter((_, i) => i !== index));
  };

  // Scroll table up/down
  const scrollTable = (direction) => {
    if (tableRef.current) {
      tableRef.current.scrollBy({ top: direction === "up" ? -100 : 100, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-medium text-[#B7202E] mb-4 border-b pb-2">Educational Details</h2>

      {/* Undergraduate Section */}
      <h3 className="font-semibold mt-4 block font-semibold text-[#004466]">UNDER GRADUATE or Equivalent</h3>
      <div className="grid grid-cols-1 gap-2 mt-2 mb-2">
        <input type="text" placeholder="Title of the degree" value={ugForm.title} 
          onChange={(e) => setUgForm({ ...ugForm, title: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center" />
        <input type="text" placeholder="Institute" value={ugForm.institute} 
          onChange={(e) => setUgForm({ ...ugForm, institute: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center" />
        <input type="text" placeholder="University" value={ugForm.university} 
          onChange={(e) => setUgForm({ ...ugForm, university: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center" />
        <select className="p-2 bg-[#FFEBE9FE] rounded text-center" value={ugForm.year} onChange={(e) => setUgForm({ ...ugForm, year: e.target.value })}>
          <option value="" disabled selected hidden>Year of Passing</option> {/* TODO: Need to change font color to match the other text input placeholders*/}
          {years.map((year) => (<option key={year} value={year}>{year}</option>))}
        </select>

      </div>
      <div className="flex justify-end mt-2">
        <button onClick={addUndergradDegree} className="text-blue-700 mt-2 cursor-pointer ">+ Add Degree</button>
      </div>

      {/* UG Degree Table */}
      {undergradDegrees.length > 0 && (
        <div className="relative mt-4">
          <div className="max-h-40 overflow-y-auto border-0.5 rounded" ref={tableRef}>
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Institute</th>
                  <th className="p-2 border">University</th>
                  <th className="p-2 border">Year</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {undergradDegrees.map((degree, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{degree.title}</td>
                    <td className="p-2 border">{degree.institute}</td>
                    <td className="p-2 border">{degree.university}</td>
                    <td className="p-2 border">{degree.year}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => deleteUndergrad(index)} className="text-red-600 flex space-x-1 cursor-pointer"><HiOutlineTrash className="w-5 h-5"/><span>Delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Scroll Buttons */}
          {/* <div className="absolute top-0 right-0 flex flex-col">
            <button onClick={() => scrollTable("up")} className="p-1 bg-gray-300 rounded-t hover:bg-gray-400">▲</button>
            <button onClick={() => scrollTable("down")} className="p-1 bg-gray-300 rounded-b hover:bg-gray-400">▼</button>
          </div> */}
        </div>
      )}

      {/* Post Graduate Section */}
      <h3 className="font-semibold mt-4 block font-semibold text-[#004466]">POST GRADUATE or Equivalent</h3>
      <div className="grid grid-cols-1 gap-2 mt-2 mb-2">
        <input type="text" placeholder="Title of the degree" value={pgForm.title} 
          onChange={(e) => setPgForm({ ...pgForm, title: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center" />
        <input type="text" placeholder="Institute" value={pgForm.institute} 
          onChange={(e) => setPgForm({ ...pgForm, institute: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center" />
        <input type="text" placeholder="University" value={pgForm.university} 
          onChange={(e) => setPgForm({ ...pgForm, university: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center" />
        <select className="p-2 bg-[#FFEBE9FE] rounded text-center" value={pgForm.year} onChange={(e) => setPgForm({ ...pgForm, year: e.target.value })}>
          <option value="" disabled selected hidden>Year of Passing</option> {/* TODO: Need to change font color to match the other text input placeholders*/}
          {years.map((year) => (<option key={year} value={year}>{year}</option>))}
        </select>
      </div>
      <div className="flex justify-end mt-2">
      <button onClick={addPostgradDegree} className="text-blue-700 mt-2 cursor-pointer">+ Add Degree</button>
      </div>  
      {postgradDegrees.length > 0 && (
        <div className="relative mt-4">
          <div className="max-h-40 overflow-y-auto border-0.5 rounded" ref={tableRef}>
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Institute</th>
                  <th className="p-2 border">University</th>
                  <th className="p-2 border">Year</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {postgradDegrees.map((degree, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{degree.title}</td>
                    <td className="p-2 border">{degree.institute}</td>
                    <td className="p-2 border">{degree.university}</td>
                    <td className="p-2 border">{degree.year}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => deletePostgrad(index)} className="text-red-600 flex space-x-1 cursor-pointer"><HiOutlineTrash className="w-5 h-5"/><span>Delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Employment Section */}
      <h3 className="font-semibold mt-4 block font-semibold text-[#004466]">EMPLOYMENT</h3>
      <div className="grid grid-cols-1 gap-2 mt-2">
        <input type="text" placeholder="Designation" value={employmentForm.designation} 
          onChange={(e) => setEmploymentForm({ ...employmentForm, designation: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center" />
        <input type="text" placeholder="Organization" value={employmentForm.organization} 
          onChange={(e) => setEmploymentForm({ ...employmentForm, organization: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center" />
<div className="grid grid-cols-2 gap-2 relative">
  <div className="relative">
    <label className={`absolute right-1/10 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-300 ${employmentForm.startDate ? 'hidden' : 'block'}`}>Start Date</label>
    <input type="month" value={employmentForm.startDate} onChange={(e) => setEmploymentForm({ ...employmentForm, startDate: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center w-full" />
  </div>
  <div className="relative">
    <label className={`absolute right-1/10 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-300 ${employmentForm.endDate ? 'hidden' : 'block'}`}>End Date</label>
    <input type="month" value={employmentForm.endDate} onChange={(e) => setEmploymentForm({ ...employmentForm, endDate: e.target.value })} className="p-2 bg-[#FFEBE9FE] rounded text-center w-full" />
  </div>
</div>
      </div>
      <div className="flex justify-end mt-2">
      <button onClick={addEmployment} className="text-blue-700 mt-2 cursor-pointer">+ Add Employment</button>
      </div>
      {employmentRecords.length > 0 && (
        <div className="relative mt-4">
          <div className="max-h-40 overflow-y-auto border-0.5 rounded" ref={tableRef}>
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Designation</th>
                  <th className="p-2 border">Organization</th>
                  <th className="p-2 border">Start Date</th>
                  <th className="p-2 border">End Date</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employmentRecords.map((record, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{record.designation}</td>
                    <td className="p-2 border">{record.organization}</td>
                    <td className="p-2 border">{record.startDate}</td>
                    <td className="p-2 border">{record.endDate}</td>
                    <td className="p-2 border">
                      <div className="flex justify-center space-x-2">
                        <button onClick={() => deleteEmployment(index)} className="text-red-600 flex space-x-1 cursor-pointer"><HiOutlineTrash className="w-5 h-5"/><span>Delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/*Buttons*/}
      <div className="flex justify-end mt-10 space-x-4">
        <button className="bg-[#006699] text-white py-2 px-4 rounded cursor-pointer hover:bg-[#004e75]" onClick={() => setActiveTab("personalDetails")}>&lt; Previous</button>
        <button className="bg-[#B7202E] text-white py-2 px-4 rounded cursor-pointer hover:bg-[#801721]" onClick={() => setActiveTab("courseDetails")}>Proceed	&gt;</button>
      </div>

      </div>
    
  );
};

export default EducationalDetails;
