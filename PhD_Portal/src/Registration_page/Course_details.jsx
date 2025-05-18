import React from "react";

const CourseDetails = ({setActiveTab}) => {
    // date range for year of passing
    const currentYear = new Date().getFullYear();
    const startYear = 1960;
    const endYear = currentYear; // Customize as needed
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }
    return (
    <div className="p-4 bg-white shadow-md ">
        <h2 className="text-3xl font-medium text-[#B7202E] mb-4 border-b pb-2">Course Details</h2>
        <h3 className="font-semibold mt-4 block font-semibold text-[#004466] mb-4">Doctorate Program Details</h3>
        <div className="grid grid-cols-1 gap-2 mt-2 mb-2">
            <input type="text" placeholder="Department of Research" className="p-2 bg-[#FFEBE9FE] rounded text-center" />
            <input type="text" placeholder="Institute" className="p-2 bg-[#FFEBE9FE] rounded text-center" />
            <select className="p-2 bg-[#FFEBE9FE] rounded text-center">
                <option value="" disabled selected hidden>Enrollment Year</option> {/* TODO: Need to change font color to match the other text input placeholders*/}
                {years.map((year) => (<option key={year} value={year}>{year}</option>))}
            </select>
        </div>  
        {/*Buttons*/}
        <div className="flex justify-end mt-10 space-x-4">
        <button className="bg-[#006699] text-white py-2 px-4 rounded cursor-pointer hover:bg-[#004e75]" onClick={() => setActiveTab("educationalDetails")}>&lt; Previous</button>
        <button className="bg-[#B7202E] text-white py-2 px-4 rounded cursor-pointer hover:bg-[#801721]" onClick={() => setActiveTab("uploadDocuments")}>Proceed	&gt;</button>
        </div>
    </div>
    );
}

export default CourseDetails;
