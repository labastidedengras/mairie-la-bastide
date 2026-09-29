import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen min-h-dvh flex-col">
      <Navbar />
      <main className="flex-1 min-h-screen bg-white">{children}</main>
      <Footer />
    </div>
  );
}
