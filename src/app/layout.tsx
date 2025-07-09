import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "StudyStim™ - Brain Boost Drink | Join the Waitlist",
  description: "The ultimate cognitive enhancer with L-Theanine, Caffeine, Alpha-GPC, and Rhodiola. Join our waitlist for early access to StudyStim™ Brain Boost Drink.",
  keywords: "brain boost, nootropics, study drink, cognitive enhancer, L-theanine, caffeine, alpha-gpc, rhodiola",
  openGraph: {
    title: "StudyStim™ - Brain Boost Drink",
    description: "Unlock your mental potential with StudyStim™. Join our exclusive waitlist today!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
