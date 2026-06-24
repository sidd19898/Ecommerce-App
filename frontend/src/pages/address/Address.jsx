import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";

import {
  useNavigate
} from "react-router-dom";

import {
  getAddresses
} from "../../api/address.api";

import {
  placeOrder
} from "../../api/order.api";

import Layout
from "../../components/layout/Layout";

export default function Address() {

  const [addresses,
    setAddresses] =
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
        sx={{ mt: 4 }}
      >

        <Typography
          variant="h4"
          mb={3}
        >
          Select Address
        </Typography>

        {
          addresses.map(
            address => (

              <Card
                key={address._id}
                sx={{ mb: 2 }}
              >

                <CardContent>

                  <Typography>
                    {
                      address.fullName
                    }
                  </Typography>

                  <Typography>
                    {
                      address.phone
                    }
                  </Typography>

                  <Typography>
                    {
                      address.addressLine1
                    }
                  </Typography>

                  <Typography>
                    {
                      address.city
                    }
                    ,
                    {
                      address.state
                    }
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      handlePlaceOrder(
                        address._id
                      )
                    }
                  >
                    Deliver Here
                  </Button>

                </CardContent>

              </Card>

            )
          )
        }

      </Container>

    </Layout>

  );

}