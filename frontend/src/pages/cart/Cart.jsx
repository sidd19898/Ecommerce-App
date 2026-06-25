import { useEffect, useState } from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Layout from "../../components/layout/Layout";

import {
  getCart,
  removeFromCart,
  updateCart
} from "../../api/cart.api";

export default function Cart() {
const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {

    try {

      const data = await getCart();

      setCart(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleRemove = async (productId) => {

    try {

      await removeFromCart(productId);

      fetchCart();

    } catch (error) {

      console.log(error);

    }

  };

  const handleQuantityChange = async (
    productId,
    quantity
  ) => {

    if (quantity < 1) return;

    try {

      await updateCart(
        productId,
        quantity
      );

      fetchCart();

    } catch (error) {

      console.log(error);

    }

  };

  const total =
    cart?.items?.reduce(
      (sum, item) =>
        sum +
        item.product.price *
          item.quantity,
      0
    ) || 0;

  return (

    <Layout>

      <Container sx={{ mt: 4 }}>

        <Typography
          variant="h4"
          mb={3}
        >
          Cart
        </Typography>

        {
          !cart?.items?.length ? (

            <Typography>
              Cart is Empty
            </Typography>

          ) : (

            <>
              {
               
               





               
  cart.items.map((item) => (

    <Card
      key={item.product._id}
      sx={{
        mb: 3,
        p: 2,
        borderRadius: 3,
        boxShadow: 2
      }}
    >

      <CardContent>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            flexWrap: {
              xs: "wrap",
              md: "nowrap"
            }
          }}
        >

          <Box
            component="img"
            src={item.product.images?.[0]}
            alt={item.product.name}
            sx={{
              width: 140,
              height: 140,
              objectFit: "contain",
              borderRadius: 2
            }}
          />

          <Box sx={{ flex: 1 }}>

            <Typography
              variant="h5"
              fontWeight={600}
            >
              {item.product.name}
            </Typography>

            <Typography
              variant="h6"
              color="primary"
              sx={{ mt: 1 }}
            >
              ₹ {item.product.price}
            </Typography>

          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >

            <IconButton
              onClick={() =>
                handleQuantityChange(
                  item.product._id,
                  item.quantity - 1
                )
              }
            >
              <RemoveIcon />
            </IconButton>

            <Typography
              variant="h6"
            >
              {item.quantity}
            </Typography>

            <IconButton
              onClick={() =>
                handleQuantityChange(
                  item.product._id,
                  item.quantity + 1
                )
              }
            >
              <AddIcon />
            </IconButton>

          </Box>

          <Button
            variant="outlined"
            color="error"
            onClick={() =>
              handleRemove(
                item.product._id
              )
            }
          >
            Remove
          </Button>

        </Box>

      </CardContent>

    </Card>

  ))







}




           <Box
  sx={{
    mt: 4,
    p: 3,
    borderRadius: 3,
    bgcolor: "#fff",
    boxShadow: 2,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2
  }}
>

  <Typography
    variant="h4"
    fontWeight={700}
  >
    Total: ₹ {total}
  </Typography>

  <Button
    variant="contained"
    size="large"
    onClick={() =>
      navigate("/address")
    }
  >
    Proceed To Checkout
  </Button>

</Box>






            </>

          )
        }

      </Container>

    </Layout>

  );

}