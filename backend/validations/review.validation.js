const { z } = require("zod");

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(3)
});

const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3)
});

module.exports = {
  reviewSchema,
  updateReviewSchema
};