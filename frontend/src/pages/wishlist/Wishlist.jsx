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

          console.log(data);

        setProducts(data.products);

      } catch (error) {

        console.log(error);

      }

    };

  const handleRemove =
    async (productId) => {

      await removeFromWishlist(
        productId
      );

      fetchWishlist();

    };

  const handleMoveToCart =
    async (productId) => {

      await addToCart(
        productId,
        1
      );

      await removeFromWishlist(
        productId
      );

      fetchWishlist();

    };

  return (

    <Layout>

      <Container
        sx={{ mt: 4 }}
      >

        <Typography
          variant="h4"
          mb={3}
        >
          Wishlist
        </Typography>

        {
          products.map(
            product => (

              <Card
                key={product._id}
                sx={{ mb: 2 }}
              >

                <CardContent>

                  <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                  >

                    <img
                      src={
                        product.images?.[0]
                      }
                      alt={
                        product.name
                      }
                      width="100"
                    />

                    <Box flex={1}>

                      <Typography>
                        {
                          product.name
                        }
                      </Typography>

                      <Typography>
                        ₹
                        {
                          product.price
                        }
                      </Typography>

                    </Box>

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

                </CardContent>

              </Card>

            )
          )
        }

      </Container>

    </Layout>

  );

}