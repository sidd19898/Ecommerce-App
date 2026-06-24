import {
  Box
} from "@mui/material";

import ProductCard
from "./ProductCard";

export default function ProductGrid({
  products
}) {

  return (

    <Box
      sx={{
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "1fr 1fr 1fr",
          lg: "1fr 1fr 1fr 1fr"
        },

        gap: 2
      }}
    >

      {
        products.map(
          product => (

            <ProductCard
              key={product._id}
              product={product}
            />

          )
        )
      }

    </Box>

  );
}