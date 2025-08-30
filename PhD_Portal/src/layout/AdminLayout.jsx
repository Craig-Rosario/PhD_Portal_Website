// src/layout/AdminLayout.jsx
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <header className="p-4 shadow-md bg-gray-100">
       
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
