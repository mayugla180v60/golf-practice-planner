import type { Metadata } from "next";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGolfBallTee } from "@fortawesome/free-solid-svg-icons";


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
      <body>
        <header className="p-6">
          <h1 className="text-xl font-bold text-center">
            <FontAwesomeIcon icon={faGolfBallTee} className="inline-block w-7 h-7 text-[#00597c]" />
            ゴルフ練習計画管理アプリ
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
