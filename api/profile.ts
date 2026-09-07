'use server'

import { cookies } from "next/headers"


export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  division: string;
  department: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  division: string;
  department: string;
}

export type ProfileData = {
  firstName: string;
  role: string;
  lastName: string;
  username: string;
  dateOfBirth: string | null;
  students: Student[];
  teachers: Teacher[];
};

export type ProfileState = {
  error?: string
  success?: boolean
  profile?: ProfileData
}

export async function retrieveProfile(
): Promise<ProfileState> {
const cookieStore = await cookies()
const token = cookieStore.get("session")?.value
  
  let res: Response
  try {
    res = await fetch(
      `${process.env.SPRING_BOOT_API_URL}/api/v1/profile`,
      {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
         },
      }
    )
  } catch {
    return { error: "Unable to connect to profile server." }
  }

  if (!res.ok) {
    let message = "Unable to process profile request."
    try {
      const body = await res.json()
      message = body.message ?? message
    } catch {}
    return { error: message }
  }
  const body = await res.json();
  const data: ProfileData = body.profile;

  console.log("Profile retrieved:", data.firstName);
  return { success: true, profile: data }
}
