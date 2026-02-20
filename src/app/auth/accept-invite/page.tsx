"use client";

import { Suspense } from "react";
import AcceptInviteClient from "./AcceptInviteClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Verifying invitation...
          </p>
        </div>
      }
    >
      <AcceptInviteClient />
    </Suspense>
  );
}