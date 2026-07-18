import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import logo from "../../../assets/school-logo.webp"

import Link from "next/link"

export const LoginForm = () => {
  return (
    <form
      action=""
      className="flex flex-col min-w-full items-center p-6 gap-6 text-black"
    >
      <Input
        placeholder="Username"
        id="username"
        className="border-b-gray-400"
      ></Input>
      <Input
        type="password"
        placeholder="Password"
        id="password"
        className="border-b-gray-400"
      ></Input>
      <Button className={"max-w-60 min-w-55"}>Sign In</Button>
      <div className="flex flex-col text-center">
        <Link href={"/activation"} className="text-red-600 border-b-2 border-b-black">
          <Button variant={"ghost"} className={"font-bold min-w-53"}>Activate Account</Button>
        </Link>
      
        <Link href={"/registration"} className="text-red-600">
          <Button variant={"ghost"} className={"font-bold"}>Parent Registration</Button>
        </Link>
      </div>
    </form>
  )
}
