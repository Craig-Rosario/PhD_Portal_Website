// src/pages/AllCourses.tsx
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import cool1 from "../../assets/cool-bg/cool1.png";

const courses = [
  {
    id: "ds",
    name: "Introduction to Data Science_H_SY_Even_24-25",
    image: cool1
  },
  {
    id: "algo",
    name: "Analysis of Algorithms_B_SY_Even_24-25",
    image: "https://via.placeholder.com/300x150?text=Algo",
  },
  {
    id: "cp",
    name: "Competitive Programming Laboratory_B_Even_24-25",
    image: "https://via.placeholder.com/300x150?text=CP",
  },
  {
    id: "os",
    name: "Operating Systems_B_Even_24-25",
    image: "https://via.placeholder.com/300x150?text=OS",
  },
];

const AllCourses = () => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-indigo-700">My Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="cursor-pointer hover:shadow-xl transition hover:scale-[1.02] border-indigo-200 border-2 bg-white"
            onClick={() => handleClick(course.id)}
          >
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-[150px] object-cover rounded-t"
            />
            <CardHeader>
              <CardTitle className="text-md font-semibold text-indigo-900">{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Click to view course details</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
