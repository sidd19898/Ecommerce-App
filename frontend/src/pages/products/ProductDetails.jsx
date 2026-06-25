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
  Box,
  Button
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

import {
  useAuth
} from "../../context/AuthContext";

import {
  updateReview,
  deleteReview
} from "../../api/review.api";

export default function ProductDetails() {

  const { id } =
    useParams();

    const { user } =
  useAuth();

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

  const [
  editingReviewId,
  setEditingReviewId
] = useState(null);


  useEffect(() => {

    fetchReviews();

    fetchProduct();

  }, []);
const handleReview =
  async () => {

    try {

      if (
        editingReviewId
      ) {

        await updateReview(
          editingReviewId,
          {
            rating,
            comment
          }
        );

        alert(
          "Review Updated"
        );

      } else {

        await createReview({
          productId: id,
          rating: Number(
            rating
          ),
          comment
        });

        alert(
          "Review Added"
        );

      }

      setComment("");
      setRating(5);

      setEditingReviewId(
        null
      );

      fetchReviews();

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



  const handleDeleteReview =
  async (
    reviewId
  ) => {

    try {

      await deleteReview(
        reviewId
      );

      fetchReviews();

      alert(
        "Review Deleted"
      );

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
<Grid
  size={{
    xs: 12,
    md: 5
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#fff",
      borderRadius: 3,
      p: 3,
      boxShadow: 2,
      height: {
        xs: 320,
        md: 420
      }
    }}
  >
    <img
      src={product.images?.[0]}
      alt={product.name}
      style={{
  width: "100%",
  height: "100%",
  objectFit: "contain"
}}
    />
  </Box>
</Grid>

          <Grid
  size={{
    xs: 12,
    md: 7
  }}
>
  <Card
    sx={{
      p: 3,
      borderRadius: 3,
      boxShadow: 2
    }}
  >
<Typography
  variant="h3"
  fontWeight={700}
>
  {product.name}
</Typography>

<Typography
  variant="h4"
  color="primary"
  mt={2}
  fontWeight={700}
>
  ₹ {product.price}
</Typography>

<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1,
    mt: 2
  }}
>
  <Rating
    value={product.averageRating || 0}
    precision={0.5}
    readOnly
  />

  <Typography>
    {product.averageRating || 0} rating
  </Typography>
</Box>

<Typography
  mt={3}
  color="text.secondary"
>
  {product.description}
</Typography>

<Box
  sx={{
    display: "flex",
    gap: 2,
    mt: 4,
    flexWrap: "wrap"
  }}
>
  <CustomButton
    onClick={handleAddToCart}
  >
    Add To Cart
  </CustomButton>

  <CustomButton
    onClick={handleWishlist}
  >
    Add To Wishlist
  </CustomButton>
</Box>
</Card>






          </Grid>

        </Grid>




<Box sx={{ mt: 6 }}>
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
  {
    editingReviewId
      ? "Update Review"
      : "Submit Review"
  }
</CustomButton>

{
  reviews.map(
    (review) => (

      <Card
  key={review._id}
  sx={{
    mt: 2,
    borderRadius: 3,
    boxShadow: 1
  }}
>


<CardContent>

  <Typography
    variant="subtitle2"
    color="primary"
    mb={1}
  >
    {
      review.user?.name
    }
  </Typography>

  <Rating
    value={
      review.rating
    }
    readOnly
  />

  <Typography
    sx={{ mt: 1 }}
  >
    {
      review.comment
    }
  </Typography>

  {
    review.user?._id ===
    user?._id && (

      <Box
        sx={{
          mt: 2,
          display: "flex",
          gap: 1
        }}
      >

        <Button
          variant="contained"
          size="small"
          onClick={() => {

            setEditingReviewId(
              review._id
            );

            setRating(
              review.rating
            );

            setComment(
              review.comment
            );

          }}
        >
          Edit
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() =>
            handleDeleteReview(
              review._id
            )
          }
        >
          Delete
        </Button>

      </Box>

    )
  }

</CardContent>

      </Card>
      

    )
  )
}

</Box>





      </Container>

    </Layout>

  );
}