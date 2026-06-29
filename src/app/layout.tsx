import type { Metadata, Viewport } from "next";

import "./globals.css";

const gridPreferenceScript = `
try {
  var value = localStorage.getItem("portfolio:grid-density:v1");
  if (value === "large") document.documentElement.dataset.gridDensity = "large";
} catch (_) {}
`;

export const metadata: Metadata = {
  title: {
    default: "Selected Work",
    template: "%s | Selected Work",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fcfbf8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: gridPreferenceScript }}
          id="grid-density-preference"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
