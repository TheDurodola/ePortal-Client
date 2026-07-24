// lib/validations/auth.schema.ts
import * as zod from "zod"

const emailField = zod.email("A valid email is required")

const passwordField = zod
  .string()
  .min(8, "Password must be at least 8 characters")
const isAdult = (dateStr: string) => {
  const dob = new Date(dateStr)
  const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  return age >= 18
}

// Composed per use case
// {
//     "firstName": "Kanye",
//     "lastName" : "West",
//     "username" : "Kanyewest@gmail.com",
//     "password":"Password123",
//     "birthDate" : "1998-11-28",
//     "childStudentNumber" : "lord_boj",
//     "childBirthDate" : "2000-11-28"
// }
const ParentSchema = zod.object({
  firstName: zod.string().min(2).max(50, "First name is too long."),
  lastName: zod.string().min(2).max(50, "Last name is too long."),
  birthDate: zod.iso.date({ message: "Invalid Date" }).refine(isAdult, {
    message: "You must be at least 18 years old to register.",
  }),
  username: zod.email("A valid email is required"),
  password: zod.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: zod.string().min(1, "Please fill in all fields."),
})

const ChildSchema = zod.object({
  childStudentNumber: zod.string().min(1, "Student number is required."),
  childBirthDate: zod.iso.date({ message: "Invalid Date" }),
})

export const RegisterSchema = zod
  .object({
    parent: ParentSchema,
    child: ChildSchema,
  })
  .refine((data) => data.parent.password === data.parent.confirmPassword, {
    message: "Passwords do not match.",
    path: ["parent", "confirmPassword"],
  })

export const SignInSchema = zod.object({
  username: zod.string().min(1, "Please fill in all fields."),
  password: zod.string().min(1, "Please fill in all fields."),
})
