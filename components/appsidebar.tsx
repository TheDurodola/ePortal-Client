'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { SignOut } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { useProfileRoleCard } from "@/hooks/useProfileRoleCard";

const AppSideBar = () => {
 
  const { user, roleCard, isFetching, error } = useProfileRoleCard();

  return (
    <Sidebar >
     <SidebarHeader className="text-center p-8 font-bold">God's Vision High School</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu className="gap-5 pt-6">
              <Link  href={'/dashboard'}>
                  <SidebarMenuButton>
                    Dashboard
                  </SidebarMenuButton>
                </Link>
              {roleCard.map((item, index) => (
                <Link key={index} href={item.link}>
                  <SidebarMenuButton>
                    {item.title}
                  </SidebarMenuButton>
                </Link>
              ))}
            
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <Button onClick={SignOut} variant={"destructive"} className={"bg-red-600  text-white"}>Sign Out</Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSideBar
