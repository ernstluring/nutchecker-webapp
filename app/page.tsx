import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/the-nutcheckers.png"
          alt="Nutchecker Logo"
          width={557}
          height={437}
          priority
        />
      </div>
      <div
        className="bg-blue-100 border-t border-b border-blue-200 text-gray-900 px-4 py-3"
        role="alert"
      >
        <p className="font-bold">Check Your Nuts Reminder</p>
        <p className="text-sm">Let me remind you once a week</p>
      </div>
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-red-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="your@email.com"
            aria-label="Email"
          />
          <button
            className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Connect
          </button>
        </div>
      </form>
    </main>
  );
}
