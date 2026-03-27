import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      {/* Tu będzie renderowana treść stron takich jak strona główna, kontakt itp. */}
      <main>{children}</main>

      <Footer />
    </>
  );
}
