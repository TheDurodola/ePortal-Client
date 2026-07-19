import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSideBar from "@/components/appsidebar"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-[max(env(safe-area-inset-top,0px),1rem)] ">
      <SidebarProvider>
        <AppSideBar/>
        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </div>
  )
}
