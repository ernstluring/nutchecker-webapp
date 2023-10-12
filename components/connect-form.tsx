import { ConnectButton } from "./connect-button";
import FillCalendar from "./fillCalendar";
import DisconnectButton from "./disconnect-button";
import { getAuthSession } from "@/lib/session";

export default async function ConnectForm() {
  const session = await getAuthSession();
  if (session) {
    return (
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-red-500 py-2">
          {/* <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="your@email.com"
            aria-label="Email"
            disabled
          /> */}
          <FillCalendar />
          <div style={{ padding: 20 }}>
            <DisconnectButton />
          </div>
        </div>
      </form>
    );
  }
  return <ConnectButton />;
}
