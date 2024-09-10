import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default function Home() {
  const { push } = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col text-primary items-center justify-center p-24 w-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-200 from-0% to-violet-900 to-70%">`}
    >
      <Image
        src={"/images/logo.png"}
        alt="RT-CHAT LOGO"
        width={105}
        height={105}
      />
      <h1 className="text-5xl mb-6">
        <span className="text-accent">rt</span>CHAT
      </h1>
      <h2 className="text-xl mb-6 overflow-hidden whitespace-nowrap animate-typewriter border-r-2">
        Real-Time Conversations. Anytime, Anywhere
      </h2>
      <Button className="px-8" onClick={() => push("/auth/signup")}>
        Sign Up
      </Button>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/users" } };
  }

  return {
    props: { session },
  };
}
