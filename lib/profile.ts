import { ROLES as ROLE } from "@/lib/constants/roles"

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
  {
    title: "Create Accounts",
    description: "Upload and create new user accounts",
    link: "/registration",
  },
  {
    title: "School Fees",
    description: "View and manage school fee records",
    link: "/fees",
  },
  { title: "Staff", description: "Manage teaching staff", link: "/staffs" },
  {
    title: "Students",
    description: "View student records",
    link: "/students",
  },
  
]

const student = [
  {
    title: "Profile",
    description: "View and update your profile",
    link: "/profile",
  },
  { 
    title: "Results", 
    description: "View your exam results",
    link: "/results" 
    },
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
  },
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

export const roleCards: Record<string, typeof student> = {
  [ROLE.STUDENT]: student,
  [ROLE.TEACHER]: teacher,
  [ROLE.PARENT]: parent,
  [ROLE.PRINCIPAL]: principal,
}