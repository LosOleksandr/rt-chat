import { z } from "zod";

export default z.object({
  name: z.string().min(1, { message: "Name is required field" }).trim(),
  email: z
    .string()
    .min(1, { message: "Email is required field" })
    .email({ message: "Not valid email format" })
    .trim(),
  phone: z.string(),
  description: z.string().max(240, { message: "240 characters max" }),
});
