"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignInSchema, RegisterSchema } from "../validations/auth.schema"

export type ActionState = {
  error?: string
  success?: boolean
}

export async function authenticate(
  username: string,
  password: string
): Promise<ActionState> {
  let res: Response
  try {
    res = await fetch(`${process.env.SPRING_BOOT_API_URL}/api/v1/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
  } catch {
    return { error: "Unable to connect to authentication server." }
  }

  if (res.status === 401) {
    return { error: "Invalid username or password." }
  }
  if (!res.ok) {
    return { error: "Something went wrong. Please try again shortly." }
  }

  let body: { jwt?: string; role?: string; expiresIn?: number }
  try {
    body = await res.json()
  } catch {
    return { error: "Unexpected response from authentication server." }
  }

  if (!body.jwt || !body.role) {
    return { error: "Unexpected response from authentication server." }
  }

  const cookieStore = await cookies()
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: body.expiresIn ?? 3600,
  }
  cookieStore.set("session", body.jwt, cookieOpts)
  cookieStore.set("role", body.role, cookieOpts)

  return { success: true }
}

export async function Signin(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const validationResult = SignInSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  })

  if (!validationResult.success) {
    return { error: validationResult.error.issues[0].message }
  }

  const result = await authenticate(
    validationResult.data.username,
    validationResult.data.password
  )

  if (result.success) redirect("/dashboard")
  return result
}

export async function SignOut(
   ){
    const cookieStore = await cookies()
    cookieStore.delete("session")
    cookieStore.delete("role")
   }
export async function ParentalRegistration(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  console.log("ParentalRegistration")
  const validationResult = RegisterSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    birthDate: formData.get("birthDate"),
    lastName: formData.get("lastName"),
    childStudentNumber: formData.get("childStudentNumber"),
    childBirthDate: formData.get("childBirthDate"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validationResult.success) {
    console.log("ZOD ERROR:" + validationResult.error.issues)

    return { error: validationResult.error.issues[0].message }
  }

  const { username, birthDate, password, firstName, lastName } =
    validationResult.data.parent
  const { childStudentNumber, childBirthDate } = validationResult.data.child

  let res: Response
  try {
    res = await fetch(
      `${process.env.SPRING_BOOT_API_URL}/api/v1/auth/registration/parent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          birthDate,
          firstName,
          lastName,
          childStudentNumber,
          childBirthDate,
        }),
      }
    )
  } catch {
    return { error: "Unable to connect to authentication server." }
  }

  if (!res.ok) {
    let message = "Registration failed."
    try {
      const body = await res.json()
      message = body.message ?? message
    } catch {}
    return { error: message }
  }

  const authResult = await authenticate(username, password)
  if (authResult.success) redirect("/dashboard")
  return authResult
}
