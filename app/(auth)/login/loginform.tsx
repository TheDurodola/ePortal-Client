import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import logo from '../../../assets/school-logo.webp'

import Link from "next/link"

export const LoginForm = () => {
  return (
    <form
      action=""
      className="flex flex-col items-center gap-7 bg-white pt-10 pr-15 pb-10 pl-15 text-black"
    >
         <Image src={logo} alt='Logo' height={100} ></Image>
      <Input placeholder="Username" id="username"></Input>
      <Input type="password" placeholder="Password" id="password"></Input>
      <Button>Sign In</Button>
      <div className="flex flex-col text-center">
        <Link href={"/activation"} className="font-bold">
          Activate Account
        </Link>
        <Link href={"/registration"} className="font-bold">
          Parent Registration
        </Link>
      </div>
    </form>
  )
}
