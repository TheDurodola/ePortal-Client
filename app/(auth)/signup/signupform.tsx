import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import logo from "@/assets/school-logo.webp"


export const SignUpForm = () => {
  return (
    <form
      action=""
      className="flex flex-col items-center gap-7 border-20 bg-white p-15 text-black"
    >
      <Image src={logo} alt="Logo" height={100}></Image>
      <Input placeholder="Username" id="username" className="w-full"></Input>
      <Input type="password" placeholder="Password" id="password"></Input>
      <Button>Sign Up</Button>
      <div className="flex flex-col text-center">
        <Link href={"/login"} className="font-bold text-violet-800">
          Log IN
        </Link>
      </div>
    </form>
  )
}
