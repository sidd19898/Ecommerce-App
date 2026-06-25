import {
  useEffect,
  useState
} from "react";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button
} from "@mui/material";

import Layout
from "../../components/layout/Layout";
import {useNavigate} from "react-router-dom";
import {
  getProfile,
  updateProfile
} from "../../api/user.api";

export default function Profile() {

    const navigate = useNavigate();
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
        sx={{ mt: 4 }}
      >

        <Paper sx={{ p: 3 }}>

          <Typography
            variant="h5"
            mb={2}
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

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleUpdate}
          >
            Update Profile
          </Button>

          
<Button
  variant="outlined"
  onClick={() =>
    navigate("/manage-addresses")
  }
>
  Manage Addresses
</Button>

        </Paper>

      </Container>

    </Layout>

  );

}