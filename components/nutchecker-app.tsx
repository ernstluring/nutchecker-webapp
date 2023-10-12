import Image from "next/image";
import ConnectForm from "./connect-form";

export function NutcheckerApp() {
  return (
    <div>
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
      <ConnectForm />
    </div>
  );
}
