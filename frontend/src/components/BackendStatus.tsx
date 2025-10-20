"use client";
import { useEffect, useState } from "react";

export default function BackendStatus() {
  const [status, setStatus] = useState<"checking" | "ok" | "error">("checking");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/health`;
    fetch(url, { cache: "no-store" })
      .then(async (res) => {
        const txt = await res.text();
        if (res.ok && txt.trim() === "OK") {
          setStatus("ok");
        } else {
          setStatus("error");
          setMessage(`Unexpected response: ${txt}`);
        }
      })
      .catch((e) => {
        setStatus("error");
        setMessage(e?.message || "Network error");
      });
  }, []);

  if (status === "checking") {
    return <p className="text-sm">Backend: <span className="font-mono">checking…</span></p>;
  }
  if (status === "ok") {
    return <p className="text-sm">Backend: <span className="font-mono text-green-600">OK</span></p>;
  }
  return (
    <p className="text-sm">
      Backend: <span className="font-mono text-red-600">ERROR</span>
      {message ? <> — <span className="font-mono">{message}</span></> : null}
    </p>
  );
}
