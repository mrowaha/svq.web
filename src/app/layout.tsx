"use client";
import { initializeStore } from "@/lib/infra/mobx/intiailize-store";
import { StoreProvider } from "@/lib/infra/mobx/root-store.provider";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/layout/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route
  // Check if the current path is one where the Navbar should be hidden
  const hideNavbar = pathname === "/login" || pathname === "/signup";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SVQ.ai</title>
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <StoreProvider value={initializeStore()}>
          {!hideNavbar && <Navbar />}
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}