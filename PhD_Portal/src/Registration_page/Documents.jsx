import { useState } from "react";
import FileInput from "./File_input"; // adjust path as needed

const Document = ({setActiveTab}) => {
  const [files, setFiles] = useState({
    undergradMarksheet: null,
    postgradMarksheet: null,
    undergradCertificate: null,
    postgradCertificate: null,
    aadharCard: null,
    eligibilityCertificate: null,
    migrationCertificate: null,
    passportPhoto: null,
    bonafideCertificate: null,
    nocCertificate: null,
  });

  const handleFileChange = (field, file) => {
    setFiles((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Upload success:", result);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto p-6  rounded-lg shadow space-y-5"
    >
      <h2 className="text-3xl font-medium text-[#B7202E] mb-6 border-b pb-2">Upload Documents</h2>
      <FileInput
        id="undergradMarksheet"
        label="Undergraduate Degree Marklist"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="postgradMarksheet"
        label="Postgraduate Degree Marklist"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="undergradCertificate"
        label="Undergraduate Degree Certificate"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="postgradCertificate"
        label="Postgraduate Degree Certificate"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="aadharCard"
        label="Aadhar Card"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="eligibilityCertificate"
        label="Degree Equivalence / Eligibility Certificate"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="migrationCertificate"
        label="Migration Certificate"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="passportPhoto"
        label="Passport Size Photograph"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="bonafideCertificate"
        label="Bonafide Certificate"
        onFileChange={handleFileChange}
      />
      <FileInput
        id="nocCertificate"
        label="No Objection Certificate (NOC)"
        onFileChange={handleFileChange}
      />
      <div className="flex items-center space-x-4 mb-4 mt-10 justify-center">
      <button className="bg-[#006699] text-white py-2 px-4 rounded cursor-pointer hover:bg-[#004e75]" onClick={() => setActiveTab("courseDetails")}>&lt; Previous</button>
      <button type="submit" className=" bg-[#B7202E] text-white py-2 px-4 rounded cursor-pointer hover:bg-[#801721]"> Submit &gt;</button>
      </div>
    </form>
  );
}

export default Document;