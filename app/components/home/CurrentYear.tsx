'use client'

import { useEffect, useState } from "react";

// The homepage is prerendered, so `buildYear` goes stale if the site isn't redeployed. Correct it in the browser.
export default function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
