import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box
} from "@mui/material";

import {
  Inventory2,
  ShoppingBag
} from "@mui/icons-material";

import {
  useNavigate
} from "react-router-dom";

import Layout
from "../../components/layout/Layout";

export default function AdminDashboard() {

  const navigate =
    useNavigate();

  return (

    <Layout>

      <Container
        maxWidth="lg"
        sx={{
          mt: 6,
          mb: 6
        }}
      >

        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
        >
          Admin Dashboard
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Manage products and orders from one place.
        </Typography>

        <Grid
          container
          spacing={3}
        >

          <Grid
            size={{
              xs: 12,
              md: 6
            }}
          >

            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: 3
              }}
            >

              <CardContent
                sx={{
                  p: 4
                }}
              >

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2
                  }}
                >

                  <Inventory2
                    color="primary"
                    fontSize="large"
                  />

                  <Typography
                    variant="h5"
                    fontWeight={600}
                  >
                    Products
                  </Typography>

                </Box>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Create, edit and remove
                  products from your
                  store.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    navigate(
                      "/admin/products"
                    )
                  }
                >
                  Manage Products
                </Button>

              </CardContent>

            </Card>

          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6
            }}
          >

            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: 3
              }}
            >

              <CardContent
                sx={{
                  p: 4
                }}
              >

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2
                  }}
                >

                  <ShoppingBag
                    color="primary"
                    fontSize="large"
                  />

                  <Typography
                    variant="h5"
                    fontWeight={600}
                  >
                    Orders
                  </Typography>

                </Box>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  View customer orders
                  and update order
                  status.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    navigate(
                      "/admin/orders"
                    )
                  }
                >
                  Manage Orders
                </Button>

              </CardContent>

            </Card>

          </Grid>




<Grid
            size={{
              xs: 12,
              md: 6
            }}
          >

            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                boxShadow: 3
              }}
            >

              <CardContent
                sx={{
                  p: 4
                }}
              >

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2
                  }}
                >

                  <ShoppingBag
                    color="primary"
                    fontSize="large"
                  />

                  <Typography
                    variant="h5"
                    fontWeight={600}
                  >
                    Categories
                  </Typography>

                </Box>

                <Typography
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  create, edit and remove categories from your store.
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    navigate(
                      "/admin/categories"
                    )
                  }
                >
                  Manage Categories
                </Button>

              </CardContent>

            </Card>

          </Grid>









        </Grid>

      </Container>

    </Layout>

  );

}