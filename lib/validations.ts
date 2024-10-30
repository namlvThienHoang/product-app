import * as z from "zod"



export const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    title: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    operator: z.enum(["and", "or"]).optional(),
  })
  

export const createProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  code: z.string(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
})

export const updateProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  code: z.string(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
})
export const getProductsSchema = searchParamsSchema
export type GetProductsSchema = z.infer<typeof getProductsSchema>
export type CreateProductSchema = z.infer<typeof createProductSchema>
export type UpdateProductSchema = z.infer<typeof updateProductSchema>