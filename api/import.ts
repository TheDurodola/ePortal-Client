// lib/api/import.ts
'use server'

import { cookies } from "next/headers"

export interface ImportResult {
  totalProcessed: number;
  successful: number;
  failedCount: number;
  teachers?: TeacherImportResult[];
  students?: StudentImportResult[];
  errors?: Array<{ row: number; reason: string }>;
}


export interface TeacherImportResult  {
  schoolId: string;
  firstName: string;
  lastName: string;
  role: string;
  grade: string;
  division: string;
}

export interface StudentImportResult  {
  schoolId: string;
  firstName: string;
  lastName: string;
  role: string;
  grade: string;
  division: string;
  department: string;
}
const BASE_URL = process.env.SPRING_BOOT_API_URL;
export async function processRegistrationFile(file: File): Promise<ImportResult> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BASE_URL}/api/v1/preregistration/excel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Failed to process spreadsheet');
  }

  return res.json();
}


export async function processSchoolFeesFile(file: File): Promise<ImportResult> {
   const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BASE_URL}/api/v1/excel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Failed to process spreadsheet');
  }

  return res.json();
}