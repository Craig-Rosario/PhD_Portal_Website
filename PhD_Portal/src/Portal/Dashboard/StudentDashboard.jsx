import StudentSidebar from "@/Portal/Student_sidebar/StudentSidebar";
import { useSelector } from "react-redux";

export default function StudentDashboard() {
  const {
    studentInfo,
    courses,
    assignments,
    announcements,
    schedule,
    progress,
  } = useSelector((state) => state.studentDashboard);

  return (
    <div className="flex">
      <StudentSidebar />
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">
            Hello, <span className="text-red-500">{studentInfo?.name || "Student"}</span>!
          </h1>
        </div>

        {/* Courses Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course, idx) => (
              <div key={idx} className="p-4 bg-white shadow rounded">
                <h4 className="font-bold mb-1">{course.name}</h4>
                <p className="text-sm text-gray-600">{course.semester}</p>
                <p className="text-sm text-gray-600">{course.faculty}</p>
                <p className="text-sm font-medium mt-1">{course.credits} Credits</p>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments and Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Assignments */}
          <div className="lg:col-span-2 p-4 bg-white shadow rounded">
            <h3 className="font-semibold mb-2">Assignments</h3>
            {assignments.length ? (
              assignments.map((a, idx) => (
                <div key={idx} className="p-2 border rounded mb-2">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-gray-500">{a.status}</p>
                  <p className="text-xs text-gray-400">Due: {a.deadline}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No assignments available.</p>
            )}
          </div>

          {/* Announcements */}
          <div className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold mb-2">Announcements</h3>
            <ul className="list-disc list-inside text-sm">
              {announcements.length ? (
                announcements.map((a, idx) => (
                  <li key={idx}>{a.message}</li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No announcements yet.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-4 bg-white shadow rounded">
          <h3 className="font-semibold mb-2">Progress</h3>
          {progress.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {progress.map((p, idx) => (
                <div key={idx} className="p-2 border rounded">
                  <p className="font-medium">{p.course}</p>
                  <p className="text-sm text-gray-500">{p.percentage}% Complete</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Progress data not available.</p>
          )}
        </div>
      </main>
    </div>
  );
}
