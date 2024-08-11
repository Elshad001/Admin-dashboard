import { z } from "zod";

export const LoginSchema = z
  .object({

    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z.string().min(6, { message: "Password must be atleast 6 characters" }),
  })


export const CreateEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Surname is required" }),
  phone: z.string().min(1, { message: "Surname is required" }),
  email: z.string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$@!%*#?&()^~{}\[\]:;',/'".,<>|+=/\\]{6,}$/, {
      message: "Password must contain at least one lowercase, one uppercase, one digit, and one special character"
    }),
  confirmPassword: z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$@!%*#?&()^~{}\[\]:;',/'".,<>|+=/\\]{6,}$/, {
      message: "Password must contain at least one lowercase, one uppercase, one digit, and one special character"
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

export const EditEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: "Name is required" }),
  lastName: z.string().min(1, { message: "Surname is required" }),
  phone: z.string().min(1, { message: "Surname is required" }),
  email: z.string()
    .email({ message: "Invalid email format" })

});

export const ResetPasswordSchema = z
  .object({
    newPassword: z.string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d$@!%*#?&()^~{}\[\]:;',/'".,<>|+=/\\]{6,}$/, {
        message: "Password must contain at least one lowercase, one uppercase, one digit, and one special character"
      }),
  })