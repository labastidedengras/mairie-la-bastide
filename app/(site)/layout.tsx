import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import NextTopLoader from "nextjs-toploader";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen min-h-dvh flex-col">
      <NextTopLoader
        color="#9e5218"
        height={3}
        showSpinner={false}
        shadow={false}
      />
      <Navbar />
      <main className="flex-1 min-h-screen bg-white">{children}</main>
      <Footer />
    </div>
  );
}
