import { SidebarProvider } from "@/components/ui/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import AppSideBar from "@/components/appsidebar"
import { Header } from "./header"
import { Separator } from "@/components/ui/separator"
import { retrieveProfile } from "@/api/profile"
import { getSchoolFeesDetails } from "@/api/schoolfees"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
 const queryClient = new QueryClient()

  await queryClient.query({
    queryKey: ["profile"],
    queryFn: retrieveProfile,
    staleTime: 60 * 30 *1000, 
  })

   await queryClient.query({
    queryKey: ["schoolfeesparent"],
    queryFn: getSchoolFeesDetails,
    staleTime: 60 * 30 *1000, 
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  )
}
