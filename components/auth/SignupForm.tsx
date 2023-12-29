import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSignupCreds } from "@/types/auth";
import validationSchema from "@/schemas/auth/signupSchema";
import Link from "next/link";
import { useToast } from "../ui/use-toast";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TSignupCreds>({
    criteriaMode: "all",
    resolver: zodResolver(validationSchema),
  });

  const { toast } = useToast();

  const onSubmit = async (data: TSignupCreds) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    if (res.status === 409) {
      const { message } = await res.json();
      setError("root.ServerError", {
        message,
      });
      toast({
        title: message,
        description: "Try again please",
      });
    }
    if (res.status === 201) {
      await signIn("credentials", { ...data });
    }
  };

  return (
    <>
      <form
        autoComplete="off"
        className="flex flex-col max-w-lg gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register("name")} type="text" label="Name" errors={errors} />
        <Input
          {...register("email")}
          type="email"
          label="Email"
          errors={errors}
        />
        <Input
          {...register("password")}
          type="password"
          label="Password"
          errors={errors}
        />
        <Input
          {...register("passwordConfirm")}
          type="password"
          label="Password confirm"
          errors={errors}
        />

        {errors.root?.ServerError && (
          <p className="text-rose-400">{errors.root?.ServerError.message}</p>
        )}

        <button>Submit</button>
        <Link href={"/auth/login"}> Already have an acount? Log In.</Link>
      </form>
    </>
  );
};

export default SignupForm;
