import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  Container,
  Grid,
  Typography,
  Box
} from "@mui/material";

import {
  addToWishlist
} from "../../api/wishlist.api";


import {
  addToCart
} from "../../api/cart.api";

import Layout
from "../../components/layout/Layout";

import Loader
from "../../components/common/Loader";

import CustomButton
from "../../components/common/CustomButton";

import {
  getProductById
} from "../../api/product.api";

export default function ProductDetails() {

  const { id } =
    useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProduct();

  }, []);

const handleWishlist =
  async () => {

    try {

      await addToWishlist(
        product._id
      );

      alert(
        "Added to wishlist"
      );

    } catch (error) {

      console.log(error);

    }

  };



const handleAddToCart =
  async () => {

    try {

      await addToCart(
        product._id,
        1
      );

      alert(
        "Added to cart"
      );

    } catch (error) {

      console.log(error);

    }

  };


  const fetchProduct =
    async () => {

      try {

        const data =
          await getProductById(id);

        setProduct(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  if (loading)
    return <Loader />;

  return (

    <Layout>

      <Container sx={{ mt: 4 }}>

        <Grid
          container
          spacing={4}
        >

          <Grid size={{
            xs:12,
            md:6
          }}>

            <img
              src={
                product.images?.[0]
              }
              alt={product.name}
              width="100%"
            />

          </Grid>

          <Grid size={{
            xs:12,
            md:6
          }}>

            <Typography
              variant="h4"
            >
              {product.name}
            </Typography>

            <Typography
              variant="h5"
              mt={2}
            >
              ₹ {product.price}
            </Typography>

            <Typography
              mt={2}
            >
              ⭐ {
                product.averageRating
              }
            </Typography>

            <Typography
              mt={2}
            >
              {
                product.description
              }
            </Typography>

            <Box mt={3}>

              <CustomButton onClick={handleAddToCart}>
                Add To Cart
              </CustomButton>

            </Box>

            <Box mt={2}>

  <CustomButton
    onClick={handleWishlist}
  >
    Add To Wishlist
  </CustomButton>

</Box>

          </Grid>

        </Grid>

      </Container>

    </Layout>

  );
}