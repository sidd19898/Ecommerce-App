const { z } = require("zod");

const categorySchema = z.object({
  name: z.string().min(2)
});

module.exports = {
  categorySchema
};