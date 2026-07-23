import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) redirect("/signin")

  const res = await fetch(`${process.env.SPRING_BOOT_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })

  if (!res.ok) redirect("/signin")

  return res.json()
}

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get("session")?.value
}

export const getUserRole = cache(async () => {
  const cookieStore = await cookies()
  return cookieStore.get("role")?.value
})