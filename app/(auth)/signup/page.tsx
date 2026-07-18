import { Button } from "@/components/ui/button"

import Image from "next/image"
import logo from "../../../assets/school-logo.webp"
import { SignUpForm } from "./signupform"

export default function SignUpPage() {
  return (
    <div className="flex  max-h-165 min-h-160 p-6">
      <div className="maw-w-90 flex min-w-80 flex-col items-center justify-center gap-4 bg-gray-50 pt-5 text-sm leading-loose">
        <Image src={logo} alt="Logo" height={150}></Image>
        <SignUpForm />
      </div>
    </div>
  )
}
