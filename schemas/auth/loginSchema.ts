import { z } from "zod";

export default z.object({
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
});
