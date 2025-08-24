import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Menu } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border-subtle bg-nav-bg px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="p-2 hover:bg-hover-bg rounded-md">
                <Menu className="h-4 w-4 text-foreground" />
              </SidebarTrigger>
              <img 
                src="/lovable-uploads/c721694d-f711-4514-80fc-4db843879469.png" 
                alt="Company Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <ThemeToggle />
          </header>
          
          <main className="flex-1 bg-content-bg">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}