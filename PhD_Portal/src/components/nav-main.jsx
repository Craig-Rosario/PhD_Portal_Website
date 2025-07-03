"use client";

import { useLocation } from "react-router-dom"; // for current path
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation(); // get current path
  const pathname = location.pathname;

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`group ${
                  isActive
                    ? "bg-[#B7202E]/10 text-[#B7202E]"
                    : "hover:text-[#B7202E] hover:bg-muted"
                }`}
              >
                <a
                  href={item.url}
                  className="flex items-center gap-2 px-2 py-2 transition-colors rounded-md"
                >
                  <item.icon
                    className={`h-5 w-5 ${
                      isActive ? "text-[#B7202E]" : "text-white"
                    }`}
                  />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
