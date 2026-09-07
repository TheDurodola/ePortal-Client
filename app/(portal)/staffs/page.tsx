"use client"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ProfileState, retrieveProfile } from "@/api/profile"
import { useQuery } from "@tanstack/react-query"

const StaffPage = () => {
  const {
    data: data,
    isFetching,
    error,
  } = useQuery<ProfileState>({
    queryKey: ["profile"],
    queryFn: retrieveProfile,
    staleTime: 60 * 30 * 1000,
  })

  const staffs = data?.profile?.teachers
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Staffs</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Grade</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Division</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffs?.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.grade}</TableCell>
                <TableCell>{staff.firstName}</TableCell>
                <TableCell>{staff.lastName}</TableCell>
                <TableCell>{staff.division}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default StaffPage
