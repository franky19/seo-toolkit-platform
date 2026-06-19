"use client";

import dynamic from "next/dynamic";

const ExitIntentModal = dynamic(() => import("@/components/home-exit-modal"), { ssr: false });

export default function ExitWrapper() {
  return <ExitIntentModal />;
}
