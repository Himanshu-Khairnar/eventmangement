import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "@/lib/store";
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'CampusConnect',
  description: 'The Ultimate College Event Hub',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <DataProvider>
            <AuthProvider>
            {children}
            </AuthProvider>
          </DataProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
