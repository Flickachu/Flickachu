"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/smoothScroll";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return <>{children}</>;
}