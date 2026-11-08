import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";
export const metadata = {
  title: "BookNook | Your Online Library",
  description:
    "Discover, borrow and share your favorite books with BookNook.",
};

 export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
