import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    headline: z.string().max(120).optional(),

    bio: z.string().max(500).optional(),

    location: z.string().max(100).optional(),

    company: z.string().max(100).optional(),

    currentPosition: z.string().max(100).optional(),

    yearsOfExperience: z
      .number()
      .min(0)
      .max(50)
      .optional(),

    portfolio: z.string().url().optional().or(z.literal('')),

    github: z.string().url().optional().or(z.literal('')),

    linkedin: z.string().url().optional().or(z.literal('')),

    twitter: z.string().url().optional().or(z.literal('')),

    skills: z.array(z.string()).optional(),

    interests: z.array(z.string()).optional(),

    availability: z
      .enum([
        'Open to Work',
        'Open to Freelance',
        'Not Available',
      ])
      .optional(),
  }),
});