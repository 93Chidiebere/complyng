import { ReactNode } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!hideNav && <Navbar />}
      <main className="flex-1">{children}</main>
    </div>
  );
};
