import * as zod from "zod"

export const ActivationSchema = zod
  .object({
    username: zod.string().min(1, "Student number is required."),
    birthDate: zod.iso.date({ message: "Invalid Date" }),
    password: zod.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: zod.string().min(1, "Please fill in all fields."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
