"use server"

import { ActivationSchema } from "@/lib/validations/activation.schema"
import { ActionState } from "@/lib/actions/auth"
import { authenticate } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

export async function AccountActivation(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const validationResult = ActivationSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    dateOfBirth: formData.get("dateOfBirth"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validationResult.success) {
    return { error: validationResult.error.issues[0].message }
  }

  const { username, dateOfBirth, password } = validationResult.data
  let res: Response
  try {
    res = await fetch(
      `${process.env.SPRING_BOOT_API_URL}/api/v1/preregistration/activation`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          dateOfBirth,
        }),
      }
    )
  } catch {
    return { error: "Unable to connect to activation server." }
  }

  if (!res.ok) {
    let message = "Account Activation failed."
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
