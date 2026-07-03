"use client";

import { useEffect } from "react";

interface FormShellProps {
  isDirty: boolean;
  children: React.ReactNode;
}

export function FormShell({ isDirty, children }: FormShellProps) {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  return <>{children}</>;
}
