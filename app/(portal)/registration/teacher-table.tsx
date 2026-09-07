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
import { TeacherImportResult } from "@/api/import"

export default function TeacherTable({ data }: { data?: { teachers?: TeacherImportResult[] } }) {
  const teachers = data?.teachers ?? [];

  return (
    <>
      {teachers.length > 0 && (
        <div>
          <p>Teachers</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Division</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.schoolId}>
                  <TableCell>{teacher.schoolId}</TableCell>
                  <TableCell>{teacher.firstName}</TableCell>
                  <TableCell>{teacher.lastName}</TableCell>
                  <TableCell>{teacher.grade}</TableCell>
                  <TableCell>{teacher.division}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}