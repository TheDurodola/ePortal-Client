"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProfileState } from "@/api/profile"
import { retrieveProfile } from "@/api/profile"
import { useQuery } from "@tanstack/react-query"

const StudentsPage = () => {
  const {
    data: data,
    isFetching,
    error,
  } = useQuery<ProfileState>({
    queryKey: ["profile"],
    queryFn: retrieveProfile,
    staleTime: 60 * 30 * 1000,
  })

  const students = data?.profile?.students
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Students</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Grade</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Division</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((students) => (
              <TableRow key={students.id}>
                <TableCell>{students.grade}</TableCell>
                <TableCell>{students.firstName}</TableCell>
                <TableCell>{students.lastName}</TableCell>
                <TableCell>{students.division}</TableCell>
                <TableCell>{students.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default StudentsPage
