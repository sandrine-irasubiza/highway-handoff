"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SenderRoutingPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/sender/create-shipment");
  }, [router]);
  return null;
}
