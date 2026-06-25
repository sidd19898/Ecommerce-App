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

import Rating from "@mui/material/Rating";

import {
  getReviews,
  createReview
} from "../../api/review.api";

import {
  TextField,
  Card,
  CardContent
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

    const [reviews, setReviews] =
  useState([]);

const [rating, setRating] =
  useState(5);

const [comment, setComment] =
  useState("");


  useEffect(() => {

    fetchReviews();

    fetchProduct();

  }, []);

const handleReview =
  async () => {

    try {

      await createReview({
        productId: id,
        rating: Number(rating),
        comment
      });

      setComment("");
      setRating(5);

      fetchReviews();

      alert(
        "Review added"
      );

    } catch (error) {

      console.log(error);

    }

  };


const fetchReviews =
  async () => {

    try {

      const data =
        await getReviews(id);

      setReviews(data);

    } catch (error) {

      console.log(error);

    }

  };
  
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

            <Typography
  variant="h5"
  mt={4}
>
  Write Review
</Typography>

<Rating
  value={rating}
  onChange={(
    event,
    value
  ) =>
    setRating(value)
  }
/>

<TextField
  fullWidth
  multiline
  rows={3}
  label="Comment"
  value={comment}
  onChange={(e) =>
    setComment(
      e.target.value
    )
  }
  sx={{ mt: 2 }}
/>

<CustomButton
  sx={{ mt: 2 }}
  onClick={handleReview}
>
  Submit Review
</CustomButton>

<Typography
  variant="h5"
  mt={4}
>
  Reviews
</Typography>

{
  reviews.map(
    (review) => (

      <Card
        key={review._id}
        sx={{ mt: 2 }}
      >

        <CardContent>

          <Rating
            value={
              review.rating
            }
            readOnly
          />

          <Typography>
            {
              review.comment
            }
          </Typography>

        </CardContent>

      </Card>

    )
  )
}

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