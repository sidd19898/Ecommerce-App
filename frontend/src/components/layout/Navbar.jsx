import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      text: "Home",
      link: "/",
      icon: <HomeIcon />
    },
    {
      text: "Cart",
      link: "/cart",
      icon: <ShoppingCartIcon />
    },
    {
      text: "Profile",
      link: "/profile",
      icon: <PersonIcon />
    },
    {
      text: "Orders",
      link: "/orders",
      icon: <ReceiptLongIcon />
    },
    {
      text: "Wishlist",
      link: "/wishlist",
      icon: <FavoriteIcon />
    },
    {
      text: "Admin",
      link: "/admin",
      icon: <AdminPanelSettingsIcon />
    }
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(25,118,210,.95)",
          borderBottom: "1px solid rgba(255,255,255,.15)"
        }}
      >
        <Toolbar>

          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 1
            }}
          >
            🛍️ ShopEase
          </Typography>

          {/* Desktop */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex"
              },
              gap: 1
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.link}
                color="inherit"
                sx={{
                  borderRadius: 5,
                  px: 2,
                  transition: ".25s",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.18)"
                  }
                }}
              >
                {item.text}
              </Button>
            ))}

            {token ? (
              <Button
                color="inherit"
                onClick={logout}
                sx={{
                  borderRadius: 5,
                  px: 2,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.18)"
                  }
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                component={Link}
                to="/login"
                color="inherit"
                sx={{
                  borderRadius: 5,
                  px: 2,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.18)"
                  }
                }}
              >
                Login
              </Button>
            )}
          </Box>

          {/* Mobile */}

          <IconButton
            sx={{
              display: {
                xs: "flex",
                md: "none"
              },
              color: "white",
              bgcolor: "rgba(255,255,255,.12)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,.25)"
              }
            }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Drawer */}

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 270,
            background:
              "linear-gradient(180deg,#1976d2,#0d47a1)",
            color: "white"
          }
        }}
      >
        <Box
          sx={{
            p: 3,
            textAlign: "center",
            borderBottom:
              "1px solid rgba(255,255,255,.2)"
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            🛍️ ShopEase
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: .8,
              mt: 1
            }}
          >
            Welcome
          </Typography>
        </Box>

        <List>

          {menuItems.map((item) => (

            <ListItem
              key={item.text}
              disablePadding
            >
              <ListItemButton
                component={Link}
                to={item.link}
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: .5,
                  "&:hover": {
                    bgcolor:
                      "rgba(255,255,255,.12)"
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                />
              </ListItemButton>

            </ListItem>

          ))}

          <ListItem disablePadding>

            <ListItemButton
              component={token ? "button" : Link}
              to={!token ? "/login" : undefined}
              onClick={() => {
                if (token) logout();
                setOpen(false);
              }}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: .5,
                "&:hover": {
                  bgcolor:
                    "rgba(255,255,255,.12)"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 40
                }}
              >
                {token ? (
                  <LogoutIcon />
                ) : (
                  <LoginIcon />
                )}
              </ListItemIcon>

              <ListItemText
                primary={
                  token
                    ? "Logout"
                    : "Login"
                }
              />

            </ListItemButton>

          </ListItem>

        </List>

      </Drawer>
    </>
  );
}