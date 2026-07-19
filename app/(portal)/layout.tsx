import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSideBar from "@/components/appsidebar"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4  bg-amber-200">
      <SidebarProvider>
        <AppSideBar/>
        <SidebarTrigger />
        
        {children}
      </SidebarProvider>
    </div>
  )
}
