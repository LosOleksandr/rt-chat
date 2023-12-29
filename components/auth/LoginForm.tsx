import { TSignupCreds } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import validationSchema from "@/schemas/auth/loginSchema";
import Input from "../Input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TSignupCreds>({
    resolver: zodResolver(validationSchema),
  });
  const { toast } = useToast();
  const onSubmit = async (data: TSignupCreds) => {
    signIn("credentials", { ...data, redirect: false }).then((res) => {
      if (!res?.ok && res?.error) {
        setError("root.serverError", { message: res.error });
        toast({ title: res.error, description: "Try again please" });
      }
    });
  };

  return (
    <form
      autoComplete="off"
      className="flex flex-col max-w-lg gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
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
      {errors.root?.serverError && <p>{errors.root?.serverError.message}</p>}
      <button>Submit</button>
      <Link href={"/auth/signup"}>{"Don't have an account? Sign Up."}</Link>
    </form>
  );
};

export default LoginForm;
