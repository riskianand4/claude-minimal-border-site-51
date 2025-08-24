import { 
  LayoutDashboard, 
  Library, 
  Users, 
  Plus, 
  Settings,
  LogOut
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Library", url: "/library", icon: Library },
  { title: "People", url: "/people", icon: Users },
  { title: "Add Assets", url: "/add-assets", icon: Plus },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-accent text-foreground font-medium border-l-2 border-primary" 
      : "text-muted-foreground hover:bg-hover-bg hover:text-foreground"

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-nav-bg border-r border-border-subtle">
        <div className="p-4 border-b border-border-subtle">
          {collapsed ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                RA
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                RA
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Rizki Ananda</p>
                <p className="text-xs text-text-secondary">Administrator</p>
              </div>
            </div>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-text-secondary text-xs uppercase tracking-wider px-4 py-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => 
                        `flex items-center px-3 py-2 rounded-md text-sm transition-colors ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className={`h-4 w-4 ${collapsed ? "mx-auto" : "mr-3"}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-2 border-t border-border-subtle">
          <SidebarMenuButton asChild>
            <NavLink 
              to="/login" 
              className="flex items-center px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-hover-bg hover:text-foreground transition-colors"
            >
              <LogOut className={`h-4 w-4 ${collapsed ? "mx-auto" : "mr-3"}`} />
              {!collapsed && <span>Logout</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}