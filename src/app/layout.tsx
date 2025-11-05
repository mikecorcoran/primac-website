import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.primacreliability.com"),
  title: {
    default: "Primac Reliability Consultants",
    template: "%s | Primac Reliability Consultants",
  },
  description:
    "Primac Reliability Consultants delivers field-proven maintenance and condition monitoring expertise for heavy industry across Western Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-base text-graphite antialiased">
        {children}
      </body>
    </html>
  );
}
