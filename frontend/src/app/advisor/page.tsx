import BackendStatus from "@/components/BackendStatus";

export default function Advisor() {
  return (
    <main className="min-h-screen p-8 grid place-items-center">
      <div className="w-full max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold">Advisor</h1>
        <p className="text-gray-600">
          This will host your conversational advisor. Chat UI coming next.
        </p>
        <div className="rounded border p-4 space-y-2">
          <BackendStatus />
          <p className="text-xs text-gray-500">
            Reading <code>NEXT_PUBLIC_BACKEND_URL</co_
