import { AuthBackgroundSlideshow } from "@/components/auth-background-slideshow"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh fixed inset-0 flex overflow-hidden items-center justify-center  py-[max(env(safe-area-inset-top,0px),1rem)] pb-[max(env(safe-area-inset-bottom,0px),1rem)]">
      <AuthBackgroundSlideshow />
      {children}
    </div>
  );
}