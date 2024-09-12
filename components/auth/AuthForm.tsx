import React, { useState } from "react";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { LiteralUnion, useForm } from "react-hook-form";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { AuthActions, TSignupCreds } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import validationLoginSchema from "@/schemas/auth/loginSchema";
import validationSignupSchema from "@/schemas/auth/signupSchema";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandSpotify,
} from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthSocialError from "./AuthSocialError";

const socialIcons = [
  <IconBrandGithub key={"github"} />,
  <IconBrandGoogle key={"google"} />,
  <IconBrandDiscord key={"discord"} />,
  <IconBrandSpotify key={"spotidy"} />,
];

type TAuthForm = {
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | never[];
  action: AuthActions;
};

const AuthForm = ({ providers, action }: TAuthForm) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm<TSignupCreds>({
    resolver: zodResolver(
      action === AuthActions.SIGNUP
        ? validationSignupSchema
        : validationLoginSchema
    ),
  });
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();

  const socialError = params.get("error");

  const onSumbit = async (data: TSignupCreds) => {
    setIsLoading(true);
    if (action === AuthActions.LOGIN) {
      const res = await signIn("credentials", { redirect: false, ...data });
      if (!res?.ok) {
        setError("root.serverError", {
          message: res?.error || "Unexpected server error",
        });
      }
    }
    if (action === AuthActions.SIGNUP) {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setError("root.serverError", {
          message: message || "Unexpected server Error",
        });
      }

      if (res.ok && res.status === 201) {
        await signIn("credentials", { redirect: false, ...data });
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSumbit)}
      >
        {action === AuthActions.SIGNUP && (
          <>
            <Input
              as="input"
              {...register("name")}
              type="text"
              label="Name"
              errors={errors}
            />
            <Input
              as="input"
              {...register("email")}
              type="email"
              label="Email"
              errors={errors}
            />
            <Input
              as="input"
              {...register("password")}
              type="password"
              label="Password"
              errors={errors}
            />
            <Input
              as="input"
              {...register("passwordConfirm")}
              type="password"
              label="Password confirm"
              errors={errors}
            />
          </>
        )}
        {action === AuthActions.LOGIN && (
          <>
            <Input
              as="input"
              {...register("email")}
              type="email"
              label="Email"
              errors={errors}
            />
            <Input
              as="input"
              {...register("password")}
              type="password"
              label="Password"
              errors={errors}
            />
          </>
        )}
        {errors.root?.serverError && (
          <small className="text-center text-danger">
            {errors.root?.serverError.message}
          </small>
        )}
        <Button disabled={isLoading}>Submit</Button>
      </form>
      <div className="w-full h-px bg-accent relative mt-8 mb-8">
        <span className="absolute bg-background-secondary -top-3 px-2 left-1/2 -translate-x-1/2">
          Or continue with
        </span>
      </div>
      {socialError && <AuthSocialError error={socialError} />}
      <ul className="grid grid-cols-2 gap-4 mt-8">
        {providers &&
          Object.values(providers)
            .filter((provider) => provider.id !== "credentials")
            .map((provider, index) => {
              return (
                <li key={provider.id} className="">
                  <Button
                    className="w-full"
                    disabled={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      signIn(provider.id, { redirect: false }).catch((err) => {
                        console.log(err);
                        setIsLoading(false);
                      });
                    }}
                  >
                    {socialIcons[index]}
                  </Button>
                </li>
              );
            })}
      </ul>

      {action === AuthActions.SIGNUP ? (
        <Link
          className="block max-w-max m-auto mt-4 hover:text-accent transition-colors"
          href={"login"}
          onClick={() => {
            reset();
          }}
        >
          Already have an account? Sign In.
        </Link>
      ) : (
        <Link
          className="block max-w-max m-auto mt-4 hover:text-accent transition-colors"
          href={"signup"}
          onClick={() => {
            reset();
          }}
        >
          New to rtCHAT? Create an account.
        </Link>
      )}
    </>
  );
};

export default AuthForm;
