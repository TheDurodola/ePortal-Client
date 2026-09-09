import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StudentImportResult } from "@/api/import"

export default function StudentTable({ data }: { data?: { students?: StudentImportResult[] } }) {
  const students = data?.students ?? [];

  if(students.length==0)return <>No Data to load</>
  return (
    <>
      {students.length > 0 && (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Session</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Tuition</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.schoolId}>
                  <TableCell>{student.schoolId}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.division}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}