"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useActionState } from "react"
import { Signin, ActionState } from "@/lib/actions/auth"

import Link from "next/link"

export const SignInForm = () => {

  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    Signin,
    {}
  )
  
  return (
    <form
      action={formAction}
      className="flex min-w-full flex-col items-center gap-6 p-6 text-black"
    >
      <Input
        name="username"
        placeholder="School ID / Email"
        id="username"
        className="border-b-gray-400"
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
      <div className="max-h-2.5 min-h-2.5">
        {state?.error && <p className="text-red-500">{state.error}</p>}
      </div>
      <Button
        className={"max-w-60 min-w-55"}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
      <div className="flex flex-col">
        <Link href={"/activation"} className="text-red-600">
          <Button variant={"ghost"} className={"min-w-53 font-bold"}>
            Activate Account
          </Button>
        </Link>
        <Separator
          orientation="horizontal"
          className={"block min-h-1 bg-black"}
        />
        <Link href={"/signup"} className="text-red-600">
          <Button variant={"ghost"} className={"font-bold"}>
            Parent Registration
          </Button>
        </Link>
      </div>
    </form>
  )
}
