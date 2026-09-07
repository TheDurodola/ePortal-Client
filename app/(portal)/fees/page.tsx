'use client'

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExcelUploader } from '@/components/excel-uploader';
import { processSchoolFeesFile, type ImportResult } from '@/api/import';
import { Button } from '@/components/ui/button';

const page = () => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: processSchoolFeesFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schoolfeesdetails'] });
    },
  });

  const handleUpload = () => {
    if (!selectedFile) return;
    mutate(selectedFile);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 py-8">
      <div>
      <div className="">
        <h1 className="text-xl font-bold">Upload School Fees</h1>
        <p className="text-sm text-muted-foreground">
          Upload an Excel spreadsheet to upload School Fees data.
        </p>
      </div>

      <ExcelUploader onFileSelect={setSelectedFile} isLoading={isPending} />

      <Button
        onClick={handleUpload}
        disabled={!selectedFile || isPending}
        className="w-full"
      >
        {isPending ? 'Processing Spreadsheet...' : 'Start Import'}
      </Button>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
          {error.message}
        </div>
      )}

      {data && (
        <div className="p-4 bg-muted border rounded-md space-y-2">
          <p className="text-sm font-semibold">Import Summary</p>
          <div className="text-xs space-y-1 text-muted-foreground">
            <p>Total Records: {data.totalProcessed}</p>
            <p className="text-emerald-600">Successfully Imported: {data.successful}</p>
            {data.failedCount > 0 && (
              <p className="text-destructive">Failed Records: {data.failedCount}</p>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default page
