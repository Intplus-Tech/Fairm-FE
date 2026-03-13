import EntryOfficerNav from "@/components/layout/EntryOfficerNav";
import EntryOfficerSide from "@/components/layout/EntryOfficerSide";
import EntryOfficerGuard from "@/components/auth/EntryOfficerGuard";
import { EntryFlowProvider } from "../../../context/entry-flow-context";


export default function EntryOfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EntryOfficerGuard>
      <EntryFlowProvider>
        <div className="h-screen bg-[#F5F5F7] overflow-hidden">

          {/* NAVBAR */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <EntryOfficerNav />
          </div>

          <div className="flex pt-[72px] h-full">

            {/* SIDEBAR */}
            <EntryOfficerSide />

            {/* CONTENT */}
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

        </div>
      </EntryFlowProvider>
    </EntryOfficerGuard>
  );
}