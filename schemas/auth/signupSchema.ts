import { z } from "zod";

export default z
  .object({
    name: z.string().min(1, { message: "Name is required field" }).trim(),
    email: z
      .string()
      .min(1, { message: "Email is required field" })
      .email({ message: "Not valid email format" })
      .trim(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password too long" })
      .trim(),
    passwordConfirm: z
      .string()
      .min(1, { message: "Confirm your password" })
      .trim(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords don't match",
  });
