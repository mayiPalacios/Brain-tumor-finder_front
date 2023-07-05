import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "../styles/globals.scss";
import "sweetalert2/dist/sweetalert2.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brain Tumor Finder",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
