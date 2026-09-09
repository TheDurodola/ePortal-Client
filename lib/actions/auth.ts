"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SignInSchema, RegisterSchema } from "../validations/auth.schema"
import { retrieveProfile } from "@/api/profile"

export type ActionState = {
  error?: string
  success?: boolean
}
const SIX_HOURS_IN_SECONDS = 60 * 60 * 6

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
    console.log(res.status)
    body = await res.json()
  } catch {
    return { error: "Unexpected response from authentication server." }
  }

  if (!body.jwt) {
    return { error: "Unexpected response from authentication server." }
  }

  const cookieStore = await cookies()
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: body.expiresIn ?? SIX_HOURS_IN_SECONDS,
  }
  cookieStore.set("session", body.jwt, cookieOpts)
  cookieStore.set("role", body.role ?? "", cookieOpts)

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

  if (result.success) {
    await retrieveProfile()
    redirect("/dashboard")
  }
  return result
}

export async function SignOut() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  cookieStore.delete("role")
  redirect("/signin")
}
export async function ParentalRegistration(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  console.log("ParentalRegistration")
  console.log("Parent birthdate " + formData.get("birthDate"))
    console.log("Child birthdate" +formData.get("childBirthDate"))
  const validationResult = RegisterSchema.safeParse({
    parent: {
      username: formData.get("username"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      dateOfBirth: formData.get("dateOfBirth"),
      lastName: formData.get("lastName"),
      confirmPassword: formData.get("confirmPassword"),
    },
    child: {
      childSchoolId: formData.get("childSchoolId"),
      childDateOfBirth: formData.get("childDateOfBirth"),
    },
  })

  if (!validationResult.success) {
    console.log("ZOD ERROR:", validationResult.error.issues)

    return { error: validationResult.error.issues[0].message }
  }

  const { username, dateOfBirth, password, firstName, lastName } =
    validationResult.data.parent
  const { childSchoolId, childDateOfBirth } = validationResult.data.child

  let res: Response
  try {
    res = await fetch(
      `${process.env.SPRING_BOOT_API_URL}/api/v1/auth/registration`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          dateOfBirth,
          firstName,
          lastName,
          childSchoolId,
          childDateOfBirth,
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
