import {
  Box,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

import CustomButton from "../../components/common/CustomButton";

export default function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async () => {

    try {

      const data = await registerUser({
        name,
        email,
        password
      });

      login(data.token);

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Signup failed"
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
          "linear-gradient(135deg, #f5f7fa 0%, #dfe9f3 100%)",
        px: 2
      }}
    >

      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: {
            xs: 3,
            sm: 5
          },
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

          <PersonAddAlt1OutlinedIcon
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
            Create Account
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 1 }}
          >
            Join our store and start shopping
          </Typography>

        </Box>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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

        <Box sx={{ mt: 4 }}>

          <CustomButton
            onClick={handleSubmit}
          >
            Sign Up
          </CustomButton>

        </Box>

        <Typography
          textAlign="center"
          sx={{ mt: 3 }}
        >
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </Typography>

      </Paper>

    </Box>

  );

}