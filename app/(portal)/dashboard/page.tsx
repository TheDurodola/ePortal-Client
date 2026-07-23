import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getUserRole } from "@/lib/actions/session"
import { ROLES as ROLE } from "@/lib/constants/roles"
import Link from "next/link"

const parent = [
  {
    title: "Profile",
    description: "View and update your profile",
    link: "/profile",
  },
  {
    title: "Results",
    description: "View your child's results",
    link: "/results",
  },
  {
    title: "Payments",
    description: "Manage school fee payments",
    link: "/payment",
  },
  {
    title: "Children Info",
    description: "Manage your children's records",
    link: "/children",
  },
]

const principal = [
  {
    title: "Profile",
    description: "View and update your profile",
    link: "/profile",
  },
  { title: "Staff", description: "Manage teaching staff", link: "/staff" },
  {
    title: "Reports",
    description: "View school-wide reports",
    link: "/reports",
  },
  {
    title: "Finance",
    description: "Overview of school finances",
    link: "/finance",
  },
]

const student = [
  {
    title: "Profile",
    description: "View and update your profile",
    link: "/profile",
  },
  { title: "Results", description: "View your exam results", link: "/results" },
  {
    title: "Attendance",
    description: "View your attendance record",
    link: "/attendance",
  },
  {
    title: "Timetable",
    description: "View your class timetable",
    link: "/timetable",
  },
  {
    title: "Payments",
    description: "Manage school fee payments",
    link: "/payments",
  }
]

const teacher = [
  {
    title: "Profile",
    description: "View and update your profile",
    link: "/profile",
  },
  {
    title: "Results",
    description: "Enter and manage student results",
    link: "/results",
  },
  {
    title: "Classes",
    description: "Manage your assigned classes",
    link: "/classes",
  },
  {
    title: "Attendance",
    description: "Mark student attendance",
    link: "/attendance",
  },
]

const roleCards: Record<string, typeof student> = {
  [ROLE.STUDENT]: student,
  [ROLE.TEACHER]: teacher,
  [ROLE.PARENT]: parent,
  [ROLE.PRINCIPAL]: principal,
}

export default async function DashboardPage() {
  const role = await getUserRole()
  
  const fixedCard = roleCards[role ?? ""]

  return (
    <div className="p-6">
      <div className="flex max-w-md flex-col gap-4 leading-loose">
        <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
        {fixedCard.map((item, index) => (
          <Link key={index} href={item.link}>
            <Card
              key={item.title}
              className="cursor-pointer  hover:bg-gray-100"
            >
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
