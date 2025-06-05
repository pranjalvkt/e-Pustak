import { useState, useEffect } from "react";

export default function ClientDate({ isoString }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isoString) return <>--</>;
  return <>{isClient ? new Date(isoString).toLocaleString() : "--"}</>;
}
