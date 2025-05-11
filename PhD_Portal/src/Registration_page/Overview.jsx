import {React, useState} from "react";

const Overview = ({setActiveTab}) => {
  
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-medium text-[#B7202E] mb-4">Overview of PhD Programme & Registration Process</h2>
      
      {/* Introduction Section */}
      <p className="text-2xl text-[#004466] mb-4">
        PhD @Somaiya Vidyavihar University
      </p>
      <div className="mb-4 p-3 rounded bg-[#FFF7F6] drop-shadow-sm">
      <p className="text-[#004466] mb-4 text-lg ">
        With over six decades of rich experience in building and managing higher educational institutes of great repute, Somaiya Vidyavihar, 
        located in the Vidyavihar Campus, Mumbai, has become a Private University in 2019, bringing all of its self- financing higher education institutions under it.<br /><br />
        The Ph.D. Research Centres under the Somaiya Self-Financing Institutes , earlier with the University of Mumbai, SNDT University and Kavikulaguru Kalidas Sanskrit University are now with the Somaiya Vidyavihar University. 
        It was enacted by an Act of the Maharashtra State Legislature, and recognised by the University Grants Commission in 2019. 
        The University has 27 recognised depts/centres for Ph.D. research and about 100 recognised and experienced research supervisors under the various Faculties.<br /><br />
        The University is resolute in defining a new dimension to research using freedom of possibilities. 
        The dynamic research community at Somaiya explores need-based problems to deliver a plethora of possibilities from renewable energy to precision farming, 
        strategies to brand value, microbial diversity to COVID predictions, culture to education among others.
      </p>
      </div>
      {/* Course Work Section */}
      <h3 className="text-2xl text-[#004466] mt-6 mb-4">About Course Work</h3>
      <div className="mb-4 p-3 rounded bg-[#FFF7F6] drop-shadow-sm">
      <p className="text-[#004466] mb-4 text-lg">
      The course work will be of one academic year (two semesters). It is expected that during the first semester the student will report the college/department/section/laboratory for attending the sessions as per Timetable. 
      The student will have to complete total 14 credits (semester I) + 4 credits (semester II) = total 18 credits with CGPI as per the Ph.D. regulations to become eligible for the registration to Ph.D. programme.
      </p>
      </div>
      {/* Registration Section */}
      <h3 className="text-2xl text-[#004466] mt-6 mb-4">Registration</h3>
      <div className="mb-4 p-3 rounded bg-[#FFF7F6] drop-shadow-sm text-lg">
      <p className="text-[#B7202E] mb-4">NOTE: This is the pre-PhD Registration at Institute level, primarily aimed at enrollment of the candidate for the coursework</p>
      <p className="text-[#004466] mb-4">As part of the registration process, candidates must submit the following documents:</p>
      <ul className="list-disc list-inside text-[#004466] space-y-0.5 ">
        <li>UG Degree or equivalent Mark List</li>
        <li>Last Two Semester Mark List</li>
        <li>UG Degree Certificates</li>
        <li>PG Degree or equivalent Mark List</li>
        <li>PG Degree or equivalent Certificates</li>
        <li>AADHAR CARD</li>
        <li>Degree Equivalence/Eligibilty Certificate (whatever is applicable)</li>
        <li>Migration Certifcate</li>
        <li>Passport size Photograph</li>
        <li>If appearing for PG Degree examination: bonafide certificate</li>
        <li>If employed: NOC from the employer at the time of provisional admission</li>
      </ul>
      </div>
      {/* Declaration & Buttons */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-[#B7202E] text-2xl mb-2">Declaration</h2>
        <label className="flex items-center text-gray-700">
          <input type="checkbox" className="mr-2" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
          I agree that all the information provided is true to the best of my knowledge, and all the documents submitted are original.
        </label>
      </div>

      <div className="flex justify-end mt-6 space-x-4">
        <button className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed">Previous</button>
        <button className={`py-2 px-4 rounded text-white 
          ${isChecked? "bg-[#B7202E] hover:bg-[#801721] cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`} 
          onClick={() => { if(isChecked){ setActiveTab("personalDetails") } }} disabled={!isChecked}>Proceed</button>
      </div>
    </div>
  );
};

export default Overview;
