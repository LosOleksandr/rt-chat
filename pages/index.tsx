import { signIn, signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();
  console.log('data: ', data);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link href={"/auth/signup"}>sign Up</Link>
      <button type="button" onClick={() => signOut()}>
        Sign Out
      </button>
    </main>
  );
}
