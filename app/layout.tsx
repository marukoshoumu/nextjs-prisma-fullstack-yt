import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/app/components/navigation/Navigation";
import AuthContext from "@/app/context/AuthContext";
import LoginModal from "@/app/components/modals/LoginModal";
import SignupModal from "@/app/components/modals/SignupModal";
import ProfileModal from "@/app/components/modals/ProfileModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ToasterContext from "@/app/context/ToastContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prisma Auth",
  description: "Prisma Auth",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <SignupModal />
          <LoginModal />
          <ProfileModal currentUser={currentUser} />
          <div className="flex min-h-screen flex-col">
            <Navigation currentUser={currentUser} />

            <main className="container mx-auto max-w-screen-sm flex-1 px-1 py-5">
              {children}
            </main>

            <footer className="py-5">
              <div className="text-center text-sm">
                Copyright © All rights reserved | FullStackChannel
              </div>
            </footer>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
