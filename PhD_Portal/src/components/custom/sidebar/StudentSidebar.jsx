
"use client";

import {
  AudioWaveform,
  BrainCog,
  House,
  BookOpen,
  Megaphone,
  BookText,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings,
  SquareTerminal,
  Brain,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarTrigger } from "../../ui/sidebar";

// Sample data
const data = {
  user: {
    name: "Swayam Sanjay Vernekar",
    avatar: "", // or use a valid image URL
    institution: "K. J. Somaiya School Of Engineering",
    enrollmentId: "1620231407",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: House ,
      isActive: true,
    },
    {
      title: "Courses",
      url: "/student/courses",
      icon: BrainCog,
    },
    {
      title: "Announcements",
      url: "/student/announcements",
      icon: Megaphone,
    },
    {
      title: "Resources",
      url: "/student/resources",
      icon: BookText,
  
    },
    {
      title: "Settings",
      url: "/student/settings",
      icon: Settings,
    },
  ]
};

export default function StudentSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-black">
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      <SidebarTrigger className="absolute right-3 top-16" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

