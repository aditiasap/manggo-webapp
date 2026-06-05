import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// provider for Toast
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Manggo App",
  description: "Manga on the Go. Generate Manga Images Easily ✨",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-slate-700`}
      >
        {children}
      </body>
    </html>
  );
}
