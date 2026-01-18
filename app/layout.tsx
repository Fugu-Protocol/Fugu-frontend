import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ChatInterface from "@/components/ai/ChatInterface";
import { SuiProvider } from "@/components/providers/SuiProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FUGU | Predict the Future",
  description: "The #1 Prediction Market on Sui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <SuiProvider>
          {children}
          <ChatInterface />
        </SuiProvider>
      </body>
    </html>
  );
}
