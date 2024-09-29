import { z } from 'zod'

export const createProductSchema = z.object({
  name: z
    .string()
    .max(255, {
      message: 'Name must not be longer than 255 characters.',
    })
    .min(2),
  desc: z
    .string()
    .max(255, {
      message: 'Username must not be longer than 255 characters.',
    })
    .min(4),
  price: z.string(),
})
