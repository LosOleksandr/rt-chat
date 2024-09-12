import React from "react";
import Input from "../ui/input";
import { useForm } from "react-hook-form";
import { TAccountCreds } from "@/types/account";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import { LoadingSpinner } from "../ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import accountCredsSchema from "@/schemas/account/accountCredsSchema";

type TAccountForm = {
  user: User;
  setIsEditing: (mode: boolean) => void;
  setUserInfo: (user: User) => void;
};

const AccountForm = ({ setIsEditing, user, setUserInfo }: TAccountForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TAccountCreds>({ resolver: zodResolver(accountCredsSchema) });

  const onSubmit = async (data: TAccountCreds) => {
    const res = await fetch("/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!res.ok) {
      setError("root.serverError", {
        message: "Oops, unable to update user credentials. Try later please.",
      });
      return;
    }

    const { data: updatedData } = await res.json();

    setIsEditing(false);
    setUserInfo(updatedData.user);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${"border-2 border-accent rounded-xl"} py-4 px-11 flex flex-col gap-4 w-full relative`}
      >
        <>
          <Input
            as="input"
            {...register("name")}
            type="text"
            disabled={isSubmitting}
            label="Name"
            errors={errors}
            defaultValue={user.name !== null ? user.name : ""}
          />
          <Input
            as="input"
            {...register("email")}
            type="text"
            label="Email"
            disabled={isSubmitting}
            errors={errors}
            defaultValue={user.email !== null ? user.email : ""}
          />
          <Input
            as="input"
            {...register("phone")}
            type="text"
            label="Phone"
            disabled={isSubmitting}
            errors={errors}
            defaultValue={user.phone !== null ? user.phone : ""}
          />
          <Input
            as="textarea"
            {...register("description")}
            type="text"
            label="About me"
            disabled={isSubmitting}
            errors={errors}
            defaultValue={user.description !== null ? user.description : ""}
          />
          {errors.root?.serverError && (
            <small className="text-center text-danger">
              {errors.root?.serverError.message}
            </small>
          )}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button disabled={isSubmitting}>{"Save"}</Button>
            <Button variant={"destructive"} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </>
        {isSubmitting && (
          <div className="grid place-content-center w-full backdrop-blur-sm rounded-xl absolute top-0 left-0 h-full">
            <div className="flex gap-2">
              <LoadingSpinner />
              <p>Updating user information</p>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default AccountForm;
