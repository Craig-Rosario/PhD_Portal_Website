import { useState } from "react";

function FileInput({ label, id, onFileSelect }) {
  const [fileName, setFileName] = useState("No file chosen");

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "No file chosen");
    if (onFileSelect) onFileSelect(id, file); // optional callback
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <label
        htmlFor={id}
        className="cursor-pointer bg-[#FFEBE9] hover:bg-[#FFD4D0] active:bg-[#FABEB9] text-black py-2 px-4 rounded-lg shadow transition duration-300 w-80 text-center"
      >
        {label}
      </label>

      <input
        id={id}
        type="file"
        className="hidden"
        onChange={handleChange}
      />

      <span className="text-gray-600 italic">{fileName}</span>
    </div>
  );
}

export default FileInput;
