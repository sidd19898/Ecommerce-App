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
                cart.items.map(
                  (item) => (

                    <Card
                      key={
                        item.product._id
                      }
                      sx={{
                        mb: 2
                      }}
                    >

                      <CardContent>

                        <Box
                          display="flex"
                          gap={2}
                          alignItems="center"
                          flexWrap="wrap"
                        >

                          <img
                            src={
                              item.product
                                .images?.[0]
                            }
                            alt={
                              item.product
                                .name
                            }
                            width="100"
                          />

                          <Box
                            flex={1}
                          >

                            <Typography
                              variant="h6"
                            >
                              {
                                item.product
                                  .name
                              }
                            </Typography>

                            <Typography>
                              ₹
                              {
                                item.product
                                  .price
                              }
                            </Typography>

                          </Box>

                          <Box
                            display="flex"
                            alignItems="center"
                          >

                            <IconButton
                              onClick={() =>
                                handleQuantityChange(
                                  item
                                    .product
                                    ._id,
                                  item.quantity -
                                    1
                                )
                              }
                            >
                              <RemoveIcon />
                            </IconButton>

                            <Typography>
                              {
                                item.quantity
                              }
                            </Typography>

                            <IconButton
                              onClick={() =>
                                handleQuantityChange(
                                  item
                                    .product
                                    ._id,
                                  item.quantity +
                                    1
                                )
                              }
                            >
                              <AddIcon />
                            </IconButton>

                          </Box>

                          <Button
                            color="error"
                            onClick={() =>
                              handleRemove(
                                item.product
                                  ._id
                              )
                            }
                          >
                            Remove
                          </Button>
                

                        </Box>

                      </CardContent>

                    </Card>

                  )
                )
              }

              <Typography
                variant="h5"
                mt={3}
              >
                Total: ₹ {total}
              </Typography>

              <Box mt={2}>
  <Button
    variant="contained"
    onClick={() => navigate("/address")}
  >
    Checkout
  </Button>
</Box>

            </>

          )
        }

      </Container>

    </Layout>

  );

}