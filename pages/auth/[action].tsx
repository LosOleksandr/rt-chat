import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Image from "next/image";
import AuthForm from "@/components/auth/AuthForm";
import { AuthActions } from "@/types/auth";

const AuthPage = ({
  providers,
  action,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { status } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      push("/users");
    }
  }, [status, push]);

  return (
    <main className="bg-background text-primary">
      <section className="h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-lg border-2 border-accent rounded-xl bg-background-secondary px-12 py-8">
          <Image
            src={"/images/logo.png"}
            alt="RT-CHAT LOGO"
            width={46}
            height={46}
            className="m-auto"
          />
          <h1 className="text-xl text-center mb-4">
            {action === AuthActions.SIGNUP
              ? "Create an account in rtChat"
              : "Sign in to your account"}
          </h1>
          <AuthForm providers={providers} action={action} />
        </div>
      </section>
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const { action } = context.query;

  if (action !== "signup" && action !== "login") {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], action: action as AuthActions },
  };
}

export default AuthPage;
