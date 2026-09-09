"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ParentalRegistration, ActionState } from "@/lib/actions/auth"
import { useActionState, useState } from "react"
import Link from "next/link"

export const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    ParentalRegistration,
    {}
  )
  const [dateText, setDateText] = useState<"text" | "date">("text")
  return (
    <form
      action={formAction}
      className="flex min-h-7 min-w-full flex-col items-center gap-5 p-6 text-black"
    >
      <Input
        name="username"
        placeholder="Email"
        id="username"
        type="email"
        className="border-b-gray-400"
        required
      ></Input>
      <Input
        name="firstName"
        placeholder="Firstname"
        id="firstName"
        className="border-b-gray-400 text-gray-400"
        required
      ></Input>
      <Input
        name="lastName"
        placeholder="Lastname"
        id="lastName"
        className="border-b-gray-400 text-gray-400"
        required
      ></Input>
      <Input
        type={dateText}
        placeholder="Date of Birth"
        onFocus={() => setDateText("date")}
        onBlur={(e) => {
          if (!e.target.value) {
            setDateText("text")
          }
        }}
        id="dateOfBirth"
        name="dateOfBirth"
        className="border-b-gray-400 text-gray-400"
        required
      ></Input>
      <Input
        name="childSchoolId"
        placeholder="Child's School Nō"
        id="childSchoolId"
        className="border-b-gray-400"
        required
      ></Input>
      <Input
        type={dateText}
        placeholder=" Child Date of Birth"
        onFocus={() => setDateText("date")}
        onBlur={(e) => {
          if (!e.target.value) {
            setDateText("text")
          }
        }}
        name="childDateOfBirth"
        id="childDateOfBirth"
        className="border-b-gray-400 text-gray-400"
        required
      ></Input>
      <Input
        name="password"
        type="password"
        placeholder="Password"
        id="password"
        className="border-b-gray-400"
        required
      ></Input>
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        id="confirmPassword"
        className="border-b-gray-400"
        required
      ></Input>
      <div className="max-h-2.5 min-h-1">
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </div>
      <Button
        className={"max-w-60 min-w-55"}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Signing Up..." : "Sign Up"}
      </Button>
      <div className="flex flex-col">
        <Link href={"/signin"} className="text-red-600">
          <Button variant={"ghost"} className={"min-w-53 font-bold"}>
            Back to Sign In
          </Button>
        </Link>
      </div>
    </form>
  )
}
