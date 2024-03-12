import { z } from "zod"

export const descriptionFormSchema = z.object({
  title: z.string().min(1, { message: "This field is required" }).max(50),
  description: z
    .string()
    .min(1, { message: "This field is required" })
    .max(250),
  price: z.coerce.number().min(10),
})
