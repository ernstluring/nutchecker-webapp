import Link from "next/link";

export default function DisconnectButton() {
  return <Link href="/api/auth/signout">Disconnect</Link>;
}
