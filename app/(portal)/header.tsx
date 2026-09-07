// components/header.tsx
import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import logo from "@/assets/school-logo.webp"
import Link from "next/link"

export function Header() {
  return (
    <header className="relative flex min-h-17 min-w-dvw items-center border-b bg-white px-4">
      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <SidebarTrigger variant="ghost" className={"bg-black rounded-2xl "}/>
      </div>
      <Link href={"/dashboard"}>
        <Image
          src={logo}
          alt="Logo"
          height={40}
          width={40}
          className="ml-40 lg:ml-160"
        />
      </Link>
    </header>
  )
}
