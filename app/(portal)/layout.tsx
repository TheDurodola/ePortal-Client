import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import AppSideBar from "@/components/appsidebar"
import { Header } from "./header"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<div className="">
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  
  </div>)
}