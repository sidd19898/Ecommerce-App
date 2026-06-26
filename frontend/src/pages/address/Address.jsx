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
  Box,
  Paper
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import LocationOnOutlinedIcon
from "@mui/icons-material/LocationOnOutlined";

import {
  getAddresses
} from "../../api/address.api";

import {
  placeOrder
} from "../../api/order.api";

import Layout
from "../../components/layout/Layout";

export default function Address() {

  const [addresses, setAddresses] =
    useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    fetchAddresses();

  }, []);

  const fetchAddresses =
    async () => {

      try {

        const data =
          await getAddresses();

        setAddresses(data);

      } catch (error) {

        console.log(error);

      }

    };

  const handlePlaceOrder =
    async (addressId) => {

      try {

        await placeOrder(
          addressId
        );

        alert(
          "Order placed successfully"
        );

        navigate("/orders");

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <Container
        maxWidth="md"
        sx={{ mt: 5, mb: 5 }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
        >
          Select Address
        </Typography>

        {
          addresses.length === 0 ? (

            <Paper
              elevation={4}
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 4
              }}
            >

              <LocationOnOutlinedIcon
                color="primary"
                sx={{
                  fontSize: 80,
                  mb: 2
                }}
              />

              <Typography
                variant="h5"
                fontWeight={700}
                gutterBottom
              >
                No Address Found
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mb: 4
                }}
              >
                You need to add a delivery
                address before you can
                place an order.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  navigate(
                    "/manage-addresses"
                  )
                }
              >
                Add New Address
              </Button>

            </Paper>

          ) : (

            addresses.map(
              address => (

                <Card
                  key={address._id}
                  elevation={3}
                  sx={{
                    mb: 3,
                    borderRadius: 3
                  }}
                >

                  <CardContent>

                    <Typography
                      variant="h6"
                      fontWeight={600}
                    >
                      {address.fullName}
                    </Typography>

                    <Typography
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {address.phone}
                    </Typography>

                    <Typography>
                      {address.addressLine1}
                    </Typography>

                    <Typography>
                      {address.city},{" "}
                      {address.state}
                    </Typography>

                    <Typography>
                      {address.pincode},{" "}
                      {address.country}
                    </Typography>

                    <Box
                      sx={{ mt: 3 }}
                    >

                      <Button
                        variant="contained"
                        size="large"
                        onClick={() =>
                          handlePlaceOrder(
                            address._id
                          )
                        }
                      >
                        Deliver Here
                      </Button>

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