const { z } = require("zod");

const addressSchema = z.object({
  fullName: z.string(),

  phone: z.string(),

  addressLine1: z.string(),

  city: z.string(),

  state: z.string(),

  pincode: z.string(),

  country: z.string()
});

module.exports = {
  addressSchema
};