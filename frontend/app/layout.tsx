import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZYX Logística",
  description: "Sistema de controle e gerenciamento de caminhões",
  icons: {
    icon: "/ZYX.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <div className="relative flex min-h-screen flex-col bg-background">
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
