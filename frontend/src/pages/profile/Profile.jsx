import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from "@mui/material";

import { useNavigate }
from "react-router-dom";

import Layout
from "../../components/layout/Layout";

import {
  getProfile,
  updateProfile
} from "../../api/user.api";

export default function Profile() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      try {

        const data =
          await getProfile();

        setName(data.name);
        setEmail(data.email);

      } catch (error) {

        console.log(error);

      }

    };

  const handleUpdate =
    async () => {

      try {

        await updateProfile({
          name
        });

        alert(
          "Profile Updated"
        );

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <Layout>

      <Container
        maxWidth="sm"
        sx={{
          mt: 6,
          mb: 6
        }}
      >

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3
          }}
        >

          <Typography
            variant="h4"
            fontWeight={600}
            gutterBottom
          >
            My Profile
          </Typography>

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            disabled
            label="Email"
            margin="normal"
            value={email}
          />

          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 2,
              flexWrap: "wrap"
            }}
          >

            <Button
              variant="contained"
              size="large"
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1"
                }
              }}
              onClick={
                handleUpdate
              }
            >
              Update Profile
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1"
                }
              }}
              onClick={() =>
                navigate(
                  "/manage-addresses"
                )
              }
            >
              Manage Addresses
            </Button>

          </Box>

        </Paper>

      </Container>

    </Layout>

  );

}