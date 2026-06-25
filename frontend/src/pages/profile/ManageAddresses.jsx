import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Stack
} from "@mui/material";

import Layout from "../../components/layout/Layout";

import {
  getAddresses,
  addAddress,
  deleteAddress,
  updateAddress
} from "../../api/address.api";

export default function ManageAddresses() {
    const [editingId, setEditingId] =
  useState(null);

  const [addresses, setAddresses] =
    useState([]);

  const [form, setForm] =
    useState({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: ""
    });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {

    try {

      const data =
        await getAddresses();

      setAddresses(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async () => {

  try {

    if (editingId) {

      await updateAddress(
        editingId,
        form
      );

      setEditingId(null);

    } else {

      await addAddress(form);

    }

    setForm({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      country: ""
    });

    fetchAddresses();

  } catch (error) {

    console.log(error);

  }

};

  const handleDelete = async (
    addressId
  ) => {

    try {

      await deleteAddress(
        addressId
      );

      fetchAddresses();

    } catch (error) {

      console.log(error);

    }

  };


  const handleEdit = (
  address
) => {

  setEditingId(
    address._id
  );

  setForm({
    fullName:
      address.fullName,
    phone:
      address.phone,
    addressLine1:
      address.addressLine1,
    addressLine2:
      address.addressLine2 || "",
    city:
      address.city,
    state:
      address.state,
    pincode:
      address.pincode,
    country:
      address.country
  });

};

  return (

    <Layout>

      <Container
        maxWidth="md"
        sx={{ mt: 4 }}
      >

        <Typography
          variant="h4"
          mb={3}
        >
          Manage Addresses
        </Typography>

        <Paper
          sx={{
            p: 3,
            mb: 4
          }}
        >

          <Typography
            variant="h6"
            mb={2}
          >
            Add New Address
          </Typography>

          <Stack spacing={2}>

            <TextField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={form.addressLine1}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Address Line 2"
              name="addressLine2"
              value={form.addressLine2}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              fullWidth
            />

<Button
  variant="contained"
  onClick={handleSubmit}
>
  {
    editingId
      ? "Update Address"
      : "Save Address"
  }
</Button>

          </Stack>

        </Paper>

        <Typography
          variant="h5"
          mb={2}
        >
          Saved Addresses
        </Typography>

        {
          addresses.length === 0 ? (

            <Typography>
              No addresses found
            </Typography>

          ) : (

            addresses.map(
              (address) => (

                <Card
                  key={address._id}
                  sx={{ mb: 2 }}
                >

                  <CardContent>

                    <Typography
                      variant="h6"
                    >
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

                    {
                      address.addressLine2 && (
                        <Typography>
                          {
                            address.addressLine2
                          }
                        </Typography>
                      )
                    }

                    <Typography>
                      {address.city},{" "}
                      {address.state}
                    </Typography>

                    <Typography>
                      {address.pincode},{" "}
                      {address.country}
                    </Typography>

                    <Button
  sx={{ mr: 1 }}
  onClick={() =>
    handleEdit(address)
  }
>
  Edit
</Button>

                    <Button
                      color="error"
                      sx={{ mt: 2 }}
                      onClick={() =>
                        handleDelete(
                          address._id
                        )
                      }
                    >
                      Delete
                    </Button>

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