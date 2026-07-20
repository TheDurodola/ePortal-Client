// components/header.tsx
import { SidebarTrigger } from "@/components/ui/sidebar"
import  Image  from "next/image"
import logo from "@/assets/school-logo.webp"
import { Separator } from "@/components/ui/separator"

export function Header() {
  return (
    <header className="relative min-w-dvw flex min-h-17 items-center border-b bg-white px-4">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <SidebarTrigger />
      </div>
      <Image src={logo} alt="Logo" height={40} width={40} className="ml-40 lg:ml-160" />
    
    </header>
  )
}