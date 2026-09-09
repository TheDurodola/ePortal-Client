"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { paySchoolFee, type SchoolFeesState, type SchoolPaymentState } from "@/api/schoolfees"
import { useActionState } from "react"

const initialState: SchoolPaymentState = {  error: undefined, redirectUrl: undefined }

const SchoolFeesTable = ({ data }: { data: SchoolFeesState }) => {
  const payloads = data.data ?? []

  if (payloads.length === 0) {
    return <div className="mt-5 text-sm text-muted-foreground">No fee records found.</div>
  }

  return (
    <div className="mt-5 border-2 border-amber-500">
      {payloads.map((payload) => {
        const tuition = Number(payload.tuition)
        const total = Number(payload.total)
        const totalPaid = Number(payload.totalPaid)
        const balance = total - totalPaid

        return (
          <FeeRow
            key={payload.studentID}
            payload={payload}
            tuition={tuition}
            balance={balance}
          />
        )
      })}
    </div>
  )
}

const FeeRow = ({
  payload,
  tuition,
  balance,
}: {
  payload: NonNullable<SchoolFeesState["data"]>[number];
  tuition: number
  balance: number
}) => {
  const [state, formAction, isPending] = useActionState(paySchoolFee, initialState)

  return (
    <div className="border-b pb-4 mb-4">
      <div>Session: {payload.session}</div>
      <div>Student Name: {payload.studentLastName} {payload.studentFirstName}</div>
      <div>Student ID: {payload.studentID}</div>
      <div>Grade: {payload.grade}</div>
      <div>Department: {payload.department}</div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Tuition</TableCell>
            <TableCell>{tuition}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Balance</TableCell>
            <TableCell>{balance}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <form action={formAction} className="flex items-center gap-3 pt-2">
        <input type="hidden" name="schoolId" value={payload.studentID} />
        <div className="w-48">
          <label htmlFor={`amount-${payload.studentID}`} className="sr-only">
            Amount to pay
          </label>
          <Input
            id={`amount-${payload.studentID}`}
            name="amount"
            type="number"
            min="1"
            max={balance > 0 ? balance : undefined}
            placeholder="Enter amount"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending || balance <= 0}
          className="bg-green-600 hover:bg-green-700"
        >
          {isPending ? "Processing..." : "Pay Now"}
        </Button>
      </form>

      {state.error && (
        <p className="text-sm text-red-600 mt-1">{state.error}</p>
      )}
    </div>
  )
}

export default SchoolFeesTable