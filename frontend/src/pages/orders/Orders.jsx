import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Card,
  CardContent,
  Typography
} from "@mui/material";

import Layout
from "../../components/layout/Layout";

import {
  getMyOrders
} from "../../api/order.api";

export default function Orders() {

  const [orders,
    setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const data =
          await getMyOrders();

        setOrders(data);

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
          My Orders
        </Typography>

        {
          orders.map(
            order => (

              <Card
                key={order._id}
                sx={{ mb: 2 }}
              >

                <CardContent>

                  <Typography>
                    Order ID:
                    {order._id}
                  </Typography>

                  <Typography>
                    Status:
                    {order.status}
                  </Typography>

                  <Typography>
                    ₹
                    {
                      order.totalAmount
                    }
                  </Typography>

                </CardContent>

              </Card>

            )
          )
        }

      </Container>

    </Layout>

  );

}