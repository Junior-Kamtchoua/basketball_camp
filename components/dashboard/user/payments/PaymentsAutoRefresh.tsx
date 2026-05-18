"use client";

import { useAutoRefresh } from "@/hooks/useAutoRefresh";

export default function PaymentsAutoRefresh() {
  useAutoRefresh({
    interval: 10000,
  });

  return null;
}
