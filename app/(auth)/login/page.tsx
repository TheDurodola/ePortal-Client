import { Button } from "@/components/ui/button"
import { LoginForm } from "./loginform"
import Image from "next/image"
import logo from '../../../assets/school-logo.webp'

export default function LoginPage() {
  return (
    <div className="flex min-h-svh p-6 ">
      <div className="flex max-w-md min-w-0 flex-col  gap-4 text-sm leading-loose justify-center">
         {/* <Image src={logo} alt='Logo' height={100} ></Image> */}
        <LoginForm />
      </div>
    </div>
  )
}
