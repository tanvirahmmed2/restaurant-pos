import ToastProvider from "@/components/bar/ToastProvider";
import "./globals.css";
import { ContextProvider } from "@/components/context/Context";


export const metadata = {
  title: "Restaurant",
  description: "Restaurant app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full overflow-x-hidden relative">
        <ContextProvider>
          <ToastProvider>
            <main>{children}</main>
          </ToastProvider>
        </ContextProvider>
      </body>
    </html>
  );
}