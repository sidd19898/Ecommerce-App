import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions
} from "@mui/material";

import {
  useNavigate
} from "react-router-dom";

import CustomButton
from "../common/CustomButton";

export default function ProductCard({
  product
}) {
  const navigate =
  useNavigate();

  return (

    <Card
  sx={{
    cursor: "pointer"
  }}
  onClick={() =>
    navigate(
      `/product/${product._id}`
    )
  }
>

      <CardMedia
  component="img"
  image={product.images?.[0]}
  alt={product.name}
  sx={{
    height: 220,
    objectFit: "contain",
    p: 2,
    backgroundColor: "#fff"
  }}
/>

      <CardContent>

        <Typography
          variant="h6"
        >
          {product.name}
        </Typography>

        <Typography>
          ₹ {product.price}
        </Typography>

        <Typography>
          ⭐ {
            product.averageRating || 0
          }
        </Typography>

      </CardContent>

      <CardActions>

        <CustomButton>
          Add To Cart
        </CustomButton>

      </CardActions>

    </Card>

  );
}