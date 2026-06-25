import {
  Box,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import ShoppingBagOutlinedIcon
from "@mui/icons-material/ShoppingBagOutlined";

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

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const handleSubmit =
    async () => {

      try {

        const data =
          await loginUser({
            email,
            password
          });

        login(
          data.token,
          data.user
        );

        navigate("/");

      } catch (error) {

        alert(
          error.response?.data?.message
        );

      }

    };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #f5f7fa 0%, #e4ecfb 100%)",
        px: 2
      }}
    >

      <Paper
        elevation={6}
        sx={{
  p: {
    xs: 3,
    sm: 5
  },
  width: "100%",
  maxWidth: 500,
  borderRadius: 5
}}
      >
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 4
  }}
>

  <ShoppingBagOutlinedIcon
    color="primary"
    sx={{
      fontSize: 56,
      mb: 2
    }}
  />

  <Typography
    variant="h4"
    fontWeight={700}
    textAlign="center"
  >
    Welcome Back
  </Typography>

  <Typography
    color="text.secondary"
    textAlign="center"
    sx={{ mt: 1 }}
  >
    Login to your account
  </Typography>

</Box>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <Box sx={{ mt: 3 }}>

          <CustomButton
            onClick={handleSubmit}
          >
            Login
          </CustomButton>

        </Box>

      </Paper>

    </Box>

  );

}