"use client";
import { initializeStore } from "@/lib/infra/mobx/intiailize-store";
import { StoreProvider } from "@/lib/infra/mobx/root-store.provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider value={initializeStore()}>{children}</StoreProvider>
      </body>
    </html>
  );
}
