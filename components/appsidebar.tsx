import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,SidebarMenuButton
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const AppSideBar = () => {
  return (
    <Sidebar>
     <SidebarHeader className="text-center p-8 font-bold">God's Vision High School</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu className="gap-5 pt-6">
                <SidebarMenuButton>
                    Dashboard
               </SidebarMenuButton>
                <SidebarMenuButton>
                    Payment
               </SidebarMenuButton>
                <SidebarMenuButton>
                    Results
               </SidebarMenuButton>
                <SidebarMenuButton>
                    Settings
               </SidebarMenuButton>
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {" "}
        <Button  variant={"destructive"} className={"bg-red-600 text-white"}>Log Out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar
