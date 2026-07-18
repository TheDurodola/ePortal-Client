import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

import Link from 'next/link'



export const LoginForm = () => {
  return (
   <form action="" className="flex items-center flex-col gap-7 bg-white text-black pt-10 pb-10 pl-15 pr-15">
    <Input placeholder="Username" id="username" ></Input>
    <Input type='password' placeholder="Password" id='password'></Input>
    <Button>Sign In</Button>
    <Link href={"/activation"}>Activate Account</Link>
    <Link href={"/registration"}>Parent Registration</Link>
   </form>
  )
}
