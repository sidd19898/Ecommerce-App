const { z } = require("zod");

const productSchema = z.object({
  name: z.string().min(2),

  description: z.string().min(5),

  price: z.number().positive(),

  stock: z.number().min(0),

  category: z.string(),

  images: z.array(
    z.string()
  ).optional()
});

module.exports = {
  productSchema
};