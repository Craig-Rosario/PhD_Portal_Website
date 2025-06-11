// File: src/components/nav-user.tsx (or .jsx if you prefer JS)

"use client"

import { Pencil } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({ user }) {
  const { state } = useSidebar()

  return (
    <SidebarMenu>
      {state == "collapsed" ? (
        <SidebarMenuItem >
          <SidebarMenuButton className="justify-center">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="rounded-lg">
                {user.name?.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ) : (
        <SidebarMenuItem className="relative flex flex-col items-center justify-center rounded-xl bg-muted p-4 gap-2">
          <button className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
            <Pencil className="h-4 w-4" />
          </button>

          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-xl">
              {user.name?.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.institution}</p>
            <p className="text-xs font-medium mt-1">
              Enrollment ID : {user.enrollmentId}
            </p>
          </div>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  )
}
