import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import ChatInterface from "@/components/ai/ChatInterface";
import { SuiProvider } from "@/components/providers/SuiProvider";
import { Toaster } from "sonner";

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
      <body
        className={`${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <SuiProvider>
          {children}
          <ChatInterface />
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                border: '2px solid black',
                borderRadius: '12px',
                boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
              },
            }}
          />
        </SuiProvider>
      </body>
    </html>
  );
}
