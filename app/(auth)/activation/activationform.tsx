"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useActionState } from "react"
import { ActionState } from "@/lib/actions/auth"
import { AccountActivation } from "@/api/activation"

const ActivationForm = () => {
  const [dateText, setDateText] = useState<"text" | "date">("text")
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    AccountActivation,
    {}
  )

  return (
    <form
      action={formAction}
      className="flex min-w-full flex-col items-center gap-6 p-6 text-black"
    >
      <Input
        name="username"
        placeholder="School Nō"
        id="username"
        className="border-b-gray-400"
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
        id="birthDate"
        name="birthDate"
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
        {isPending ? "Activating..." : "Activate"}
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

export default ActivationForm
