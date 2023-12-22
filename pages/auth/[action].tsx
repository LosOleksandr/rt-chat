import SignupForm from "@/components/auth/SignupForm";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useParams } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

const AuthPage = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { action } = useParams();
  return (
    <>
      {action === "signup" ? <SignupForm /> : <LoginForm />}
      {providers &&
        Object.values(providers).map((provider) => {
          return (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  if (context.query.action !== "signup" && context.query.action !== "login") {
    return { redirect: { destination: "/" } };
  }
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

export default AuthPage;
