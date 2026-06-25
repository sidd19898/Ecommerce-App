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
  ListItemText,
  Divider
} from "@mui/material";

import {
  Link,
  useLocation
} from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

  const { token, user, logout } = useAuth();

  const location = useLocation();

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
    }
  ];

  if (user?.role === "admin") {
    menuItems.push({
      text: "Admin",
      link: "/admin",
      icon: <AdminPanelSettingsIcon />
    });
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          background:
            "linear-gradient(90deg,#1565c0,#1976d2)"
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
                  px: 2,
                  borderRadius: 5,
                  bgcolor:
                    location.pathname === item.link
                      ? "rgba(255,255,255,.18)"
                      : "transparent",
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
              color: "white"
            }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* Drawer */}

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 310,
            background: "#fff",
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
            overflow: "hidden"
          }
        }}
      >

        {/* Header */}

        <Box
          sx={{
            background:
              "linear-gradient(135deg,#1565c0,#42a5f5)",
            p: 3,
            color: "white"
          }}
        >

          <Box
            display="flex"
            alignItems="center"
            gap={2}
          >

            <Box
              sx={{
                width: 64,
                height: 64,
                bgcolor: "white",
                borderRadius: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ShoppingBagOutlinedIcon
                sx={{
                  color: "#1976d2",
                  fontSize: 38
                }}
              />
            </Box>

            <Box>

              <Typography
                variant="h5"
                fontWeight={700}
              >
                ShopEase
              </Typography>

              <Typography
                sx={{
                  opacity: .9
                }}
              >
                Welcome 👋
              </Typography>

            </Box>

          </Box>

        </Box>

        {/* Navigation */}

        <Box
          sx={{
            py: 2,
            flex: 1
          }}
        >

          <List>

            {menuItems.map((item) => {

              const active =
                location.pathname === item.link;

              return (

                <ListItem
                  key={item.text}
                  disablePadding
                >

                  <ListItemButton

                    component={Link}
                    to={item.link}

                    onClick={() =>
                      setOpen(false)
                    }

                    sx={{
                      mx: 2,
                      my: .5,
                      borderRadius: 3,

                      background: active
                        ? "#eef4ff"
                        : "transparent",

                      borderLeft: active
                        ? "4px solid #1976d2"
                        : "4px solid transparent",

                      "&:hover": {
                        background: "#eef4ff"
                      }
                    }}
                  >

                    <ListItemIcon>

                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          bgcolor: "#f5f7fb",
                          borderRadius: 2,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {item.icon}
                      </Box>

                    </ListItemIcon>

                    <ListItemText
                      primary={item.text}
                    />

                  </ListItemButton>

                </ListItem>

              );

            })}

          </List>

        </Box>

        <Divider />

        {/* Bottom */}

        <Box
          sx={{
            p: 2
          }}
        >

          {token ? (

            <Button

              fullWidth

              color="error"

              variant="outlined"

              startIcon={<LogoutIcon />}

              onClick={() => {
                logout();
                setOpen(false);
              }}

              sx={{
                borderRadius: 3,
                height: 54
              }}
            >
              Logout
            </Button>

          ) : (

            <Button

              fullWidth

              variant="contained"

              component={Link}

              to="/login"

              startIcon={<LoginIcon />}

              onClick={() =>
                setOpen(false)
              }

              sx={{
                borderRadius: 3,
                height: 54
              }}
            >
              Login
            </Button>

          )}

        </Box>

      </Drawer>
    </>
  );
}