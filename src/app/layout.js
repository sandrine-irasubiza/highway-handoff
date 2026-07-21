

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Highway Handoff System",
  description:
    "A modern logistics and transport management platform designed to provide secure, fast, and reliable delivery coordination solutions.",
  icons: [{ rel: "icon", url: "/images/one.png" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <head />

      <body
        className={`${inter.className} bg-background font-body-md text-on-background`}
      >
        {children}
      </body>
    </html>
  );
}