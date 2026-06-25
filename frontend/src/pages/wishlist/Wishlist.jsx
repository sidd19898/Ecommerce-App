import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box
} from "@mui/material";

import Layout
from "../../components/layout/Layout";

import {
  getWishlist,
  removeFromWishlist
} from "../../api/wishlist.api";

import {
  addToCart
} from "../../api/cart.api";

export default function Wishlist() {

  const [products,
    setProducts] =
    useState([]);

  useEffect(() => {

    fetchWishlist();

  }, []);

  const fetchWishlist =
    async () => {

      try {

        const data =
          await getWishlist();

        setProducts(
          data.products
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleRemove =
    async (productId) => {

      try {

        await removeFromWishlist(
          productId
        );

        fetchWishlist();

      } catch (error) {

        console.log(error);

      }

    };

  const handleMoveToCart =
    async (productId) => {

      try {

        await addToCart(
          productId,
          1
        );

        await removeFromWishlist(
          productId
        );

        fetchWishlist();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 6
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
          mb={3}
        >
          Wishlist
        </Typography>

        {
          products.length === 0 ? (

            <Card
              sx={{
                p: 4,
                borderRadius: 3
              }}
            >

              <Typography
                variant="h6"
                align="center"
              >
                Your wishlist is empty.
              </Typography>

            </Card>

          ) : (

            products.map(
              product => (

                <Card
                  key={product._id}
                  sx={{
                    mb: 3,
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
                        src={
                          product.images?.[0]
                        }
                        alt={
                          product.name
                        }
                        sx={{
                          width: 140,
                          height: 140,
                          objectFit:
                            "contain",
                          borderRadius: 2
                        }}
                      />

                      <Box
                        sx={{
                          flex: 1
                        }}
                      >

                        <Typography
                          variant="h5"
                          fontWeight={600}
                        >
                          {
                            product.name
                          }
                        </Typography>

                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{
                            mt: 1
                          }}
                        >
                          ₹
                          {
                            product.price
                          }
                        </Typography>

                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexWrap:
                            "wrap"
                        }}
                      >

                        <Button
                          variant="contained"
                          onClick={() =>
                            handleMoveToCart(
                              product._id
                            )
                          }
                        >
                          Move To Cart
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            handleRemove(
                              product._id
                            )
                          }
                        >
                          Remove
                        </Button>

                      </Box>

                    </Box>

                  </CardContent>

                </Card>

              )
            )

          )
        }

      </Container>

    </Layout>

  );

}