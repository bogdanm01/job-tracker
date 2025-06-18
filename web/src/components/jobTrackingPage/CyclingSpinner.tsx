import { useState, useEffect } from "react";
import { Spinner } from "@heroui/spinner";

const LOADING_MESSAGES = [
  "Initializing neural grid…",
  "Decrypting access sequence…",
  "Stabilizing quantum loop…",
  "Engaging photon uplink…",
  "Splicing mainframe threads…",
  "Recalibrating optic array…",
  "Amplifying signal matrix…",
  "Compiling mission payload…",
  "Extracting encrypted cores…",
  "Activating stealth protocol…",
];

function getNextRandomMessage(current: string): string {
  let next = current;

  while (next === current) {
    next =
      LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
  }

  return next;
}

const CyclingSpinner = ({ isLoading }: { isLoading: boolean }) => {
  const [message, setMessage] = useState(
    () => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
  );

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setMessage((prev) => getNextRandomMessage(prev));
    }, 1500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <Spinner
      variant="gradient"
      label={message}
      size="sm"
      classNames={{
        base: "flex-row gap-3 mt-2",
        label: "text-sm mt-2 animate-pulse",
      }}
    />
  );
};

export default CyclingSpinner;
