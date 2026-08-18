import type { Metadata } from "next";
import { Poppins, Parisienne, Caveat } from "next/font/google";
import AudioPlayer from "@/components/ui/AudioPlayer";
import { AudioProvider } from "@/contexts/AudioContext";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const parisienne = Parisienne({
  subsets: ["latin"],
  variable: "--font-parisienne",
  weight: "400",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Happy Birthday 💙",
  description: "A special birthday gift",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${parisienne.variable} ${caveat.variable}`}
        suppressHydrationWarning
      >
        <AudioProvider src="/music/Langit Sore - Selamat Ulang Tahun Sayang.mp3">
          <AudioPlayer />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}