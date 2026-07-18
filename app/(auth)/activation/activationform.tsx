"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

const ActivationForm = () => {
  const [dateText, setDateText] = useState<"text" | "date">("text")
  return (
    <form
      action=""
      className="flex min-w-full flex-col items-center gap-6 p-6 text-black"
    >
      <Input
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
        id="password"
        className="border-b-gray-400 text-gray-400"
        required
      ></Input>
      <Input
        type="password"
        placeholder="Password"
        id="password"
        className="border-b-gray-400"
        required
      ></Input>
      <Input
        type="password"
        placeholder="Confirm Password"
        id="password"
        className="border-b-gray-400"
        required
      ></Input>
      <Button className={"max-w-60 min-w-55"}>Activate</Button>
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
