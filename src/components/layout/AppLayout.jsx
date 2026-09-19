import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import { ToastProvider } from "../ui/ToastContext";

export default function AppLayout() {
  return (
    <ToastProvider>
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        <main className="bg-canvas min-h-screen p-3 sm:p-5 lg:p-6 pb-24 lg:pb-6">
          <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-5 lg:gap-6">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
    </ToastProvider>
  );
}
