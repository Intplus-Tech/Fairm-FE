import AdminNavbar from "@/components/layout/AdminNavbar";
import { LayoutProvider } from "../../../context/layout-context";
import AppSidebar from "@/components/layout/AppSidebar";
import FloatingAskAI from "@/components/dashboard/FloatingAskAI";
import AddPenModal from "@/components/modals/AddPenModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutProvider>
      <div className="h-screen bg-[#F5F5F7] overflow-hidden">
        {/* FIXED NAVBAR */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <AdminNavbar />
        </div>

        {/* BODY */}
        <div className="flex pt-[72px] h-full">
          {/* FIXED SIDEBAR */}
          <AppSidebar />

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              flex-1
              h-[calc(100vh-72px)]
              overflow-y-auto
              px-4 sm:px-6
              py-6
              max-w-[1920px]
              mx-auto
              w-full
            "
          >
            {children}
          </div>
        </div>

        {/* FLOATING AI BUTTON */}
        <FloatingAskAI />

        <AddPenModal/>
      </div>
    </LayoutProvider>
  );
}
