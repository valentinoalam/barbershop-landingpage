import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { generateMetaData } from "@/lib/metadata"
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { CartProvider } from "@/contexts/cart-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  return generateMetaData();
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: 'white',
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <div className="relative flex size-full min-h-screen flex-col bg-[#181611] dark group/design-root overflow-x-hidden" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
            <div className="flex flex-col h-full layout-container grow">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
