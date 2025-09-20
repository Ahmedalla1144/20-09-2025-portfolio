import type { Metadata } from "next";
import "@/app/globals.css";
import "swiper/css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Inter, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";


const geistSans = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "https://new-portfolio1144.netlify.app/favicon.ico" }],
    shortcut: [{ url: "https://new-portfolio1144.netlify.app/favicon.ico" }],
  },
  title: "Ahmed – Portfolio",
  description: "Personal portfolio built with Next.js + Tailwind By Eng.Ahmed Alaa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
