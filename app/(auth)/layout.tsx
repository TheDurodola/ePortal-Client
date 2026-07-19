import { AuthBackgroundSlideshow } from "@/components/auth-background-slideshow"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh fixed inset-0 flex overflow-hidden items-center justify-center   ">
      <AuthBackgroundSlideshow />
      {children}
    </div>
  );
}