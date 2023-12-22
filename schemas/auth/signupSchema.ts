import { z } from "zod";

export default z
  .object({
    name: z.string().min(1, { message: "Name is required field" }),
    email: z
      .string()
      .min(1, { message: "Email is required field" })
      .email({ message: "Not valid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password too long" }),
    passwordConfirm: z.string().min(8).max(32),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords don't match",
  });
