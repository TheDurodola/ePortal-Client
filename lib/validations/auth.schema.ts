// lib/validations/auth.schema.ts
import * as zod from "zod"

const emailField = zod.email("A valid email is required").toLowerCase().trim()

const passwordField = zod
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must include an uppercase letter")
  .regex(/[0-9]/, "Password must include a number")

const isAdult = (dateStr: string) => {
  const dob = new Date(dateStr)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate())
  if (!hasHadBirthdayThisYear) age--
  return age >= 18
}

// Composed per use case
const ParentSchema = zod.object({
  firstName: zod.string().min(2).max(50, "First name is too long."),
  lastName: zod.string().min(2).max(50, "Last name is too long."),
  dateOfBirth: zod.iso.date({ message: "Parent Invalid Date Format" }).refine(isAdult, {
    message: "You must be at least 18 years old to register.",
  }),
  username: emailField,
  password: passwordField,
  confirmPassword: zod.string().min(1, "Please confirm your password."),
})

const ChildSchema = zod.object({
  childSchoolId: zod.string().min(1, "Student number is required."),
  childDateOfBirth: zod.iso.date({ message: "Child Invalid Date Format" }),
})

export const RegisterSchema = zod
  .object({
    parent: ParentSchema,
    child: ChildSchema,
  })
  .refine((data) => data.parent.password == data.parent.confirmPassword, {
    message: "Passwords do not match.",
    path: ["parent", "confirmPassword"],
  })
  .refine(
    (data) =>
      new Date(data.child.childDateOfBirth) > new Date(data.parent.dateOfBirth),
    {
      message: "Child birth date must be after parent birth date.",
      path: ["child", "childDateOfBirth"],
    }
  )

export const SignInSchema = zod.object({
  username: zod.string().min(1, "Please fill in all fields."),
  password: zod.string().min(1, "Please fill in all fields."),
})
