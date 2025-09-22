import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGolfBallTee } from "@fortawesome/free-solid-svg-icons";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Practice App",
  description: "ゴルフの練習管理に最適です",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-6">
          <h1 className="text-xl font-bold text-center">
            <FontAwesomeIcon icon={faGolfBallTee} className="inline-block w-7 h-7 text-[#00597c]" />
            ゴルフ練習計画管理アプリ
            <FontAwesomeIcon icon={faGolfBallTee} className="inline-block w-7 h-7 text-[#00597c]" />          
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
