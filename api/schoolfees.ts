"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "@/lib/constants/url"
import { redirect } from "next/navigation"

export type SchoolFeesPayload = {
  studentID: string
  studentFirstName: string
  studentLastName: string
  grade: string
  department: string
  session: string
  tuition: string
  total: string
  totalPaid: string
}





export type SchoolFeesState = {
  error?: string
  data?: SchoolFeesPayload[]
}

export type SchoolPaymentState = {
  error?: string
  redirectUrl?: string
}

export async function getSchoolFeesDetails(): Promise<SchoolFeesState> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  let res: Response

  const headers: HeadersInit = {
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  "Content-Type": "application/json",
};
  try {
     res = await fetch(`${BASE_URL}/api/v1/schoolfee`, {
      method: "GET",
      headers: headers,
    })
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
  const body = await res.json()
  const data: SchoolFeesPayload[] = body.data

  return { data: data }
}

export async function verifySchoolFees(
  formData: FormData
): Promise<SchoolFeesState> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  const studentUsername = formData.get("username")
  const amount = formData.get("amount")

  const res = await fetch(`${BASE_URL}/api/v1/schoolfee/verification`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      studentId: studentUsername,
      session: amount,
    }),
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.message || "Unable to load school fees details")
  }

  return res.json()
}
export async function paySchoolFee(
 prevState: SchoolPaymentState,
  formData: FormData
): Promise<SchoolPaymentState> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  const amount = formData.get("amount")
  const schoolId = formData.get("schoolId") as string;
 const headers: HeadersInit = {
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  "Content-Type": "application/json",
};
  const res = await fetch(`${BASE_URL}/api/v1/schoolfee/payment`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      studentId: schoolId,
      amount: amount,
    }),
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.message || "Unable to process school fee payment")
  }

  const body = await res.json()
  const redirectUrl = body.redirectUrl ?? "message"

  redirect(redirectUrl)
}
