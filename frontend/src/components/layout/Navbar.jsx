import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {
  Link
} from "react-router-dom";

export default function Navbar() {
    const { token, logout } =
  useAuth();

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          E-Commerce
        </Typography>

        <Box>

          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/cart"
          >
            Cart
          </Button>

          
  {
  token ? (
    <Button
      color="inherit"
      onClick={logout}
    >
      Logout
    </Button>
  ) : (
    <Button
      color="inherit"
      component={Link}
      to="/login"
    >
      Login
    </Button>
  )
}


        </Box>

      </Toolbar>

    </AppBar>

  );
}