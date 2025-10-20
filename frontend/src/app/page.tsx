import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-center sm:text-left">
        <Image
          className="dark:invert mb-4"
          src="/next.svg"
          alt="Acquisition Scout Logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to <span className="text-blue-600">Acquisition Scout</span>
        </h1>
        <p className="max-w-lg text-gray-600">
          Your AI-powered investment advisor for business acquisitions.  
          Search, evaluate, and score opportunities across Micro-SaaS, AI tools, and local businesses — powered by OpenAI Agents.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
          <Link
            href="/advisor"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 sm:w-auto shadow-md"
          >
            Open Advisor
          </Link>

          <a
            className="rounded-full border border-solid border-gray-300 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#1a1a1a] font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 sm:w-auto"
            href="https://github.com/rberry3/acquisition-scout"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
        <span>© {new Date().getFullYear()} Acquisition Scout</span>
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://flywheelconsultancy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Flywheel Consultancy
        </a>
      </footer>
    </div>
  );
}

