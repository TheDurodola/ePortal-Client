import { Button } from "@/components/ui/button"
import { LoginForm } from "./loginform"
import Image from "next/image"
import logo from "../../../assets/school-logo.webp"

export default function LoginPage() {
  return (
    <div className="flex min-h-150  p-6">
      <div className=" flex flex-col maw-w-90 min-w-80 items-center justify-center gap-4 bg-gray-50 text-sm leading-loose">
        <Image src={logo} alt="Logo" height={200}></Image>
        <LoginForm />
      </div>
    </div>
  )
}
