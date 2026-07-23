"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type ActionState = {
  error?: string
}

export async function signin(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const username = formData.get("username")
  const password = formData.get("password")

  console.log("Form Data:", { username, password })
  if (!username || !password) {
    return { error: "Please fill in all fields." }
  }

  let res: Response
  try {
    res = await fetch(`${process.env.SPRING_BOOT_API_URL}/api/v1/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
  } catch (err) {
    return { error: "Unable to connect to authentication server." }
  }

  if (!res.ok) {
    return { error: "Invalid username or password." }
  }

  const { jwt, role } = await res.json()

  const cookieStore = await cookies()
  cookieStore.set("session", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
 
  cookieStore.set("role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })

  redirect("/dashboard")
}