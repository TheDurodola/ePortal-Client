// components/excel-uploader.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExcelUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export function ExcelUploader({ onFileSelect, isLoading }: ExcelUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        setError('Please upload a valid Excel spreadsheet (.xlsx or .xls).');
        return;
      }

      const selected = acceptedFiles[0];
      if (selected) {
        setFile(selected);
        onFileSelect(selected);
      }
    },
    [onFileSelect]
  );

  const handleRemove = () => {
    setFile(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024, // 10MB limit
    multiple: false,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
  });

  return (
    <div className="max-w-100  space-y-3">
      {!file ? (
        <Card
          {...getRootProps()}
          className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {isDragActive ? 'Drop spreadsheet here' : 'Click to select or drag and drop Excel file'}
            </p>
            <p className="text-xs text-muted-foreground">Accepts .xlsx or .xls (Max 10MB)</p>
          </div>
        </Card>
      ) : (
        <div className="flex items-center justify-between border rounded-lg p-4 bg-muted/20">
          <div className="truncate">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={isLoading}
          >
            Change
          </Button>
        </div>
      )}

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}