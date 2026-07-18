import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import logo from "../../../assets/school-logo.webp"

import Link from "next/link"

export const LoginForm = () => {
  return (
    <form
      action=""
      className="flex flex-col items-center gap-7 border-20 bg-white p-15 text-black"
    >
      <Image src={logo} alt="Logo" height={100}></Image>
      <Input placeholder="Username" id="username" className="w-full"></Input>
      <Input type="password" placeholder="Password" id="password"></Input>
      <Button>Sign In</Button>
      <div className="flex flex-col text-center">
        <Link href={"/activation"} className="font-bold text-violet-800">
          Activate Account
        </Link>
        <Link href={"/registration"} className="font-bold text-violet-800">
          Parent Registration
        </Link>
      </div>
    </form>
  )
}
