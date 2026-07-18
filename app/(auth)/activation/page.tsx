import Image from "next/image"
import ActivationForm from "./activationform"
import logo from "../../../assets/school-logo.webp"

export default function Page() {
  return (
    <div className="flex min-h-150  p-6">
          <div className=" flex flex-col maw-w-90 min-w-80 items-center justify-center gap-4 bg-gray-50 text-sm pt-5 leading-loose">
            <Image src={logo} alt="Logo" height={150}></Image>
            <ActivationForm />
          </div>
        </div>
  )
}
