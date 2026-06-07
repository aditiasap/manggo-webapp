import { Nunito, Poppins } from 'next/font/google';
import "./globals.css";

// provider for Toast
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // hanya memuat ketebalan 400, 600, 700
  style: ['normal', 'italic'],
  variable: '--font-poppins',
  display: 'swap',
});
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata = {
  title: "MangGo App",
  description: "Manga on the Go. Generate Manga Images Easily ✨",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${nunito.variable} antialiased font-nunito
          text-slate-800 text-sm`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
};
