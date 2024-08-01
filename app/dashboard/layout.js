import { SheetProvider } from "@/context/SheetContext";
import { TaskProvider } from "@/context/TaskContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-zinc-400/10 ${inter.className}`}>
        <TaskProvider>

          <SheetProvider>
            {children}
          </SheetProvider>
        </TaskProvider>
      </body>
    </html>
  );
}
