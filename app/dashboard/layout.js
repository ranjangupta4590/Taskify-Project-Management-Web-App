import { SheetProvider } from "@/context/SheetContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-zinc-400/10 ${inter.className}`}>
          <SheetProvider>
            {children}
          </SheetProvider>
      </body>
    </html>
  );
}
