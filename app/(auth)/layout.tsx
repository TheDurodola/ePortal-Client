import Image from 'next/image'
import backgrouncImage from "@/assets/campus2.jpg"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-muted px-4 py-[max(env(safe-area-inset-top,0px),1rem)] pb-[max(env(safe-area-inset-bottom,0px),1rem)]">
      {children}
    </div>
  );
}