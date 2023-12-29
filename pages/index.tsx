import { Inter } from "next/font/google";
import Link from "next/link";
import SignOutBtn from "@/components/auth/SignOutBtn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [router, session]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Link href={"/auth/signup"}>sign Up</Link>
      <SignOutBtn>Sign Out</SignOutBtn>
    </main>
  );
}
