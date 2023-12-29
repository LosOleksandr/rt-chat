import SignupForm from "@/components/auth/SignupForm";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
// import { getServerSession } from "next-auth";
import { getProviders, signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
// import { authOptions } from "../api/auth/[...nextauth]";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";

const AuthPage = ({
  providers,
  action,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [router, session]);

  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => {
          if (provider.id === "credentials") {
            return action === "signup" ? (
              <SignupForm key={provider.id} />
            ) : (
              <LoginForm key={provider.id} />
            );
          }
          return (
            <div key={provider.id} style={{ marginBottom: 0 }}>
              <button onClick={async () => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const session = await getServerSession(context.req, context.res, authOptions);

  // if (session) {
  //   return { redirect: { destination: "/" } };
  // }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], action: context.query.action },
  };
}

export default AuthPage;
