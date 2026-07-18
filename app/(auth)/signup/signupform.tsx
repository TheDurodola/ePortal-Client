
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'



export const SignUpForm = () => {
  return (
     <form
      action=""
      className="flex flex-col min-w-full  items-center p-6 gap-6 text-black"
    >
      <Input
        placeholder="Email"
        id="email"
        type='email'
        className="border-b-gray-400"
        required
      ></Input>
      <Input
        placeholder="Firstname"
        id="firstname"
        className="text-gray-400 border-b-gray-400"
        required
      ></Input>
       <Input
        placeholder="Lastname"
        id="lastname"
        className="text-gray-400 border-b-gray-400"
        required
      ></Input>
       <Input
        type="date"
        placeholder="Date of Birth"
        id="password"
        className="text-gray-400 border-b-gray-400"
        required
      ></Input>
      <Input
        type="password"
        placeholder="Child's School Nō"
        id="password"
        className="border-b-gray-400"
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
      <Button className={"max-w-60 min-w-55"}>Sign Up</Button>
      <div className="flex flex-col ">
        <Link href={"/signin"} className="text-red-600">
          <Button variant={"ghost"} className={"font-bold min-w-53"}>Back to Sign In</Button>
        </Link>
      </div>
    </form>
  )
}
