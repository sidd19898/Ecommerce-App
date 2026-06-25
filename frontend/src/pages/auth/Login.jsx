import {
  Box,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser }
from "../../api/auth.api";

import { useAuth }
from "../../context/AuthContext";

import CustomButton
from "../../components/common/CustomButton";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async () => {

    try {

      const data =
        await loginUser({
          email,
          password
        });

      login(data.token,data.user);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (

    <Box
      display="flex"
      justifyContent="center"
      mt={8}
    >

      <Paper
        sx={{
          p: 3,
          width: {
            xs: "90%",
            sm: 400
          }
        }}
      >

        <Typography
          variant="h5"
          mb={2}
        >
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <CustomButton
          onClick={handleSubmit}
        >
          Login
        </CustomButton>

      </Paper>

    </Box>

  );
}