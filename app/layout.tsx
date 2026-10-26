import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TamilNandu | Coming Soon",
  description:
    "TamilNandu is a Tamil-rooted global mutual-help community, open to everyone. Join early to hear when the first version launches."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
