"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Dumbbell, LayoutDashboard, Users, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "My Workouts",
      icon: Dumbbell,
      href: "/my-workouts",
      active: pathname === "/my-workouts",
    },
    {
      label: "Community",
      icon: Users,
      href: "/community",
      active: pathname === "/community",
    },
    {
      label: "Statistics",
      icon: BarChart2,
      href: "/statistics",
      active: pathname === "/statistics",
    },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="border-b">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-3">
          <Dumbbell className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl">Workout Wizard</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton asChild isActive={route.active}>
                    <Link href={route.href}>
                      <route.icon className="h-5 w-5" />
                      <span>{route.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Settings className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Settings</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

