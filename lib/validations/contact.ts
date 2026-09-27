import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your full name."),
  email: z.string().email("Enter a valid email address."),
  discipline: z.string().min(2, "Tell us your sport or discipline."),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters.")
    .max(1000, "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
