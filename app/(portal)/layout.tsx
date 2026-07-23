import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import AppSideBar from "@/components/appsidebar"
import { Header } from "./header"
import { Separator } from "@/components/ui/separator"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-dvw ">
      <SidebarProvider>
        <AppSideBar />
        <SidebarInset>
          <Header />
          <Separator orientation='horizontal' className={"h-14 bg-amber-800"}/>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
