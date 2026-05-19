"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  interval?: number;
}

export function useAutoRefresh({ interval = 15000 }: Props = {}) {
  const router = useRouter();

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      router.refresh();
    }, interval);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [router, interval]);
}
