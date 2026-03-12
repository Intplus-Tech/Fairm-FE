import { Suspense } from "react";
import AcceptInviteClient from "./AcceptInviteClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Verifying invitation...
        </div>
      }
    >
      <AcceptInviteClient />
    </Suspense>
  );
}