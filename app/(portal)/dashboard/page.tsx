import { DashboardHeader } from "@/app/(portal)/dashboard/DashboardHeader"
import { DashboardContent } from "@/app/(portal)/dashboard/DashboardContent"

export default async function DashboardPage() {
  

  return (
   
      <div className="p-6">
        <div className="flex max-w-md flex-col gap-4 leading-loose">
          <DashboardHeader></DashboardHeader>
        </div>
        <DashboardContent></DashboardContent>
      </div>

  )
}
