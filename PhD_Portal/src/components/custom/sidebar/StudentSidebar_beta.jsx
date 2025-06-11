// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { Calendar } from "@/components/ui/calendar"
// import { useState } from "react"
// import { CalendarIcon, Menu } from "lucide-react"

// export default function StudentSidebar() {
//   const [date, setDate] = useState(new Date())
//   const [open, setOpen] = useState(false)

//   return (
//     <div>
//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetTrigger asChild>
//           <button className="p-2">
//             <Menu />
//           </button>
//         </SheetTrigger>
//         <SheetContent side="left" className="w-[300px] sm:w-[350px]">
//           <div className="flex flex-col gap-6 p-4">
//             <div className="flex flex-col gap-2">
//               <h2 className="text-lg font-semibold">Navigation</h2>
//               <ul className="space-y-2">
//                 <li>📚 My Courses</li>
//                 <li>📢 Announcements</li>
//                 <li>📅 Schedule</li>
//                 <li>📈 Progress</li>
//                 <li>⚙️ Settings</li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium mb-2">My Schedule</h3>
//               <Calendar mode="single" selected={date} onSelect={setDate} />
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   )
// }


// V.2

// // src/Portal/Student_sidebar/AppSidebar.jsx
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
//   useSidebar,
// } from "@/components/ui/sidebar";
// import { Home, Book, Calendar, User, PanelLeftClose, PanelRightOpen } from "lucide-react";
// import { NavLink } from "react-router-dom";

// export default function StudentSidebar() {
//   const { collapsed, toggle } = useSidebar(); // <-- use ShadCN's collapse context

//   const items = [
//     { name: "Dashboard", icon: <Home size={20} />, path: "/portal/dashboard" },
//     { name: "Courses", icon: <Book size={20} />, path: "/portal/courses" },
//     { name: "Schedule", icon: <Calendar size={20} />, path: "/portal/schedule" },
//     { name: "Profile", icon: <User size={20} />, path: "/portal/profile" },
//   ];

//   return (
//     <Sidebar className="h-screen border-r bg-white">
//       {/* Collapse Button */}
//       <button
//         onClick={toggle}
//         className="absolute top-4 right-[-12px] z-10 bg-white border rounded-full p-1 shadow-md hover:bg-gray-100 cursor-pointer transition-colors"
//       >
//         {collapsed ? (
//           <PanelRightOpen className="h-5 w-5 text-black" />
//         ) : (
//           <PanelLeftClose className="h-5 w-5 text-black" />
//         )}
//       </button>

//       <SidebarContent className="pt-16 overflow-y-auto">
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.name}>
//                   <SidebarMenuButton asChild>
//                     <NavLink to={item.path} className="flex items-center gap-3">
//                       {item.icon}
//                       {!collapsed && <span>{item.name}</span>}
//                     </NavLink>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//         <SidebarSeparator className="w-full" />
//         {!collapsed && (
//           <div className="p-4 text-sm text-gray-600">
//             Username
//           </div>
//         )}
//       </SidebarContent>
//     </Sidebar>
//   );
// }