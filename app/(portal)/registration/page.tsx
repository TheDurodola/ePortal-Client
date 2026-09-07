"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ExcelUploader } from "@/components/excel-uploader"
import { processRegistrationFile, type ImportResult } from "@/api/import"
import { Button } from "@/components/ui/button"
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
import TeacherTable from "./teacher-table"
import StudentTable from "./student-table"

const Registration = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const queryClient = useQueryClient()

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: processRegistrationFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
  })

  const handleUpload = () => {
    if (!selectedFile) return
    mutate(selectedFile)
  }

  return (
    <div className="mx-auto max-w-xl space-y-6 py-8">
      <div className="">
        <h1 className="text-xl font-bold">Upload Registration Data</h1>
        <p className="text-sm text-muted-foreground">
          Upload an Excel spreadsheet to bulk-create student and teacher
          records.
        </p>
      </div>

      <ExcelUploader onFileSelect={setSelectedFile} isLoading={isPending} />

      <Button
        onClick={handleUpload}
        disabled={!selectedFile || isPending}
        className="w-full"
      >
        {isPending ? "Processing Spreadsheet..." : "Start Import"}
      </Button>

      {error && (
        <div className="rounded border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          {error.message}
        </div>
      )}

      {data && (
        <div className="space-y-2 rounded-md border bg-muted p-4">
          <p className="text-sm font-semibold">Import Summary</p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>Total Records: {data.totalProcessed}</p>
            <p className="text-emerald-600">
              Successfully Imported: {data.successful}
            </p>
            <StudentTable data={data} />

            <TeacherTable data={data} />

            {data.failedCount > 0 && (
              <p className="text-destructive">
                Failed Records: {data.failedCount}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Registration
