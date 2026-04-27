import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sumaanta Munde — Senior Software Developer",
  description:
    "Senior Software Engineer with 3.5+ years scaling high-impact products. Expert in server-driven systems, React Native, and frontend architecture.",
  openGraph: {
    title: "Sumaanta Munde — Senior Software Developer",
    description:
      "Senior Software Engineer with 3.5+ years scaling high-impact products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
