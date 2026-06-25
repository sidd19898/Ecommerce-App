import {
  Container,
  Typography,
  Button,
  Stack
} from "@mui/material";

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
        sx={{ mt: 4 }}
      >

        <Typography
          variant="h4"
          mb={4}
        >
          Admin Dashboard
        </Typography>

        <Stack spacing={2}>

          <Button
            variant="contained"
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
          >
            Manage Products
          </Button>

          <Button
            variant="contained"
            onClick={() =>
              navigate(
                "/admin/orders"
              )
            }
          >
            Manage Orders
          </Button>

        </Stack>

      </Container>

    </Layout>

  );

}