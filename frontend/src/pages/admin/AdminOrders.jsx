import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box
} from "@mui/material";

import Layout from "../../components/layout/Layout";

import {
  getAllOrders,
  updateOrderStatus
} from "../../api/admin.api";

export default function AdminOrders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders =
    async () => {

      try {

        const data =
          await getAllOrders();

        setOrders(data);

      } catch (error) {

        console.log(error);

      }

    };

  const handleStatusChange =
    async (
      orderId,
      status
    ) => {

      try {

        await updateOrderStatus(
          orderId,
          status
        );

        fetchOrders();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <Container
        maxWidth="lg"
        sx={{ mt: 4 }}
      >

        <Typography
          variant="h4"
          mb={3}
        >
          Manage Orders
        </Typography>

        {
          orders.length === 0 ? (

            <Typography>
              No Orders Found
            </Typography>

          ) : (

            orders.map(
              (order) => (

                <Card
                  key={order._id}
                  sx={{ mb: 3 }}
                >

                  <CardContent>

                    <Grid
                      container
                      spacing={2}
                    >

                      <Grid size={{
                        xs: 12,
                        md: 8
                      }}>

                        <Typography
                          variant="h6"
                        >
                          Order ID
                        </Typography>

                        <Typography>
                          {order._id}
                        </Typography>

                        <Box
                          mt={2}
                        >

                          <Typography>
                            User:
                          </Typography>

                          <Typography>
                            {
                              order.user
                                ?.name
                            }
                          </Typography>

                          <Typography>
                            {
                              order.user
                                ?.email
                            }
                          </Typography>

                        </Box>

                        <Box
                          mt={2}
                        >

                          <Typography>
                            Total Amount
                          </Typography>

                          <Typography>
                            ₹
                            {
                              order.totalAmount
                            }
                          </Typography>

                        </Box>

                        <Box
                          mt={2}
                        >

                          <Typography>
                            Products
                          </Typography>

                          {
                            order.items?.map(
                              (
                                item
                              ) => (

                                <Typography
                                  key={
                                    item
                                      ._id
                                  }
                                >
                                  {
                                    item
                                      .product
                                      ?.name
                                  }
                                  {" "}
                                  ×
                                  {" "}
                                  {
                                    item.quantity
                                  }
                                </Typography>

                              )
                            )
                          }

                        </Box>

                      </Grid>

                      <Grid size={{
                        xs: 12,
                        md: 4
                      }}>

                        <Chip
                          label={
                            order.status
                          }
                          sx={{
                            mb: 2
                          }}
                        />

                        <FormControl
                          fullWidth
                        >

                          <InputLabel>
                            Status
                          </InputLabel>

                          <Select
                            value={
                              order.status
                            }
                            label="Status"
                            onChange={(
                              e
                            ) =>
                              handleStatusChange(
                                order._id,
                                e.target
                                  .value
                              )
                            }
                          >

                            <MenuItem value="Pending">
                              Pending
                            </MenuItem>

                            <MenuItem value="Confirmed">
                              Confirmed
                            </MenuItem>

                            <MenuItem value="Packed">
                              Packed
                            </MenuItem>

                            <MenuItem value="Shipped">
                              Shipped
                            </MenuItem>

                            <MenuItem value="Delivered">
                              Delivered
                            </MenuItem>

                            <MenuItem value="Cancelled">
                              Cancelled
                            </MenuItem>

                          </Select>

                        </FormControl>

                      </Grid>

                    </Grid>

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