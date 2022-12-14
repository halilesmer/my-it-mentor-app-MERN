import * as React from "react";

import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppContext } from "../contexts/appContext";
import Drawer from "../components/Drawer";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import jwt_decode from "jwt-decode";

export default function NavBar() {
  const [drawerKey, setDrawerKey] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { handleLogoutClick, isUserLoggedIn } = React.useContext(AppContext);
  const [token, setToken] = React.useState("");

  const decodedToken = token ? jwt_decode(token) : "";

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [isUserLoggedIn]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawerClick = () => {
    setDrawerKey(!drawerKey);
  };

  let activeStyle = {
    textDecoration: "underline",
  };
  let noActive = {
    textDecoration: "none",
  };

  // console.log("userType: ", userType);
  // console.log("token: ", token);
  // console.log("decodedToken: ", token && jwt_decode(token),decodedToken);
  // console.log("decodedToken: ", decodedToken);

  // console.log("decodedToken: ", decodedToken);
  // console.log("isUserLoggedIn: ", isUserLoggedIn);
  // console.log("drawerKey: ", drawerKey);
  return (
    <Box
      className="navbar-con"
      sx={{
        flexGrow: 1,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: "5",
      }}
    >
      <AppBar
        position="static"
        sx={{ margin: "auto", height: "2.5rem", justifyContent: "center" }}
      >
        <Toolbar>
          {/* {user && ( */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpenDrawerClick}
          >
            <MenuIcon />
          </IconButton>
          {/* )} */}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              My IT Mentor
            </Link>
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              // the profile photos color changed regarding of users type
              style={{
                color: `${
                  decodedToken && decodedToken.role === "mentee"
                    ? "#2fd373"
                    : decodedToken.role === "mentor"
                    ? "orange"
                    : "black"
                }`,
              }}
              // style={{ color: {decodedToken ? "#2fd373" : 'orange'} }}
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* ----------------- login Page Link  --------------------- */}
              {/* {!user && pathname.pathname !== "/login" && ( */}
              {!token && (
                <List onClick={handleClose}>
                  <ListItem disablePadding sx={{ padding: "0" }}>
                    <ListItemButton>
                      <ListItemIcon style={{ minWidth: "2.5rem" }}>
                        <LoginIcon />
                      </ListItemIcon>

                      <NavLink
                        to="/signin"
                        style={({ isActive }) =>
                          isActive ? activeStyle : noActive
                        }
                      >
                        <ListItemText primary="Login" />
                      </NavLink>
                    </ListItemButton>
                  </ListItem>
                </List>
              )}

              {/* ----------------- Sign Up Page && Profile Link  --------------------- */}

              <List
                disablePadding
                onClick={handleClose}
                className="profile-links"
              >
                {!token && (
                  <>
                    <ListItem disablePadding sx={{ padding: "0" }}>
                      <ListItemButton>
                        <ListItemIcon style={{ minWidth: "2.5rem" }}>
                          <LockOpenIcon />
                        </ListItemIcon>

                        <NavLink
                          to="/signup"
                          style={({ isActive }) =>
                            isActive ? activeStyle : noActive
                          }
                        >
                          <ListItemText primary="Sign up" />
                        </NavLink>
                      </ListItemButton>
                    </ListItem>
                  </>
                )}

                {token && (
                  <>
                    <ListItem sx={{ padding: "0" }}>
                      <ListItemButton>
                        <ListItemIcon style={{ minWidth: "2.5rem" }}>
                          <ManageAccountsIcon />
                        </ListItemIcon>
                        <NavLink
                          className="nav-link-profile"
                          to={
                            decodedToken.role === "mentor"
                              ? "/mentors/profile"
                              : "/mentees/profile"
                          }
                          // to="/mentors/profile"
                          style={({ isActive }) =>
                            isActive ? activeStyle : noActive
                          }
                        >
                          <ListItemText
                            className="profile-text"
                            primary="Profile"
                          />
                        </NavLink>
                      </ListItemButton>
                    </ListItem>

                    {decodedToken.role === "mentee" && (
                      <ListItem sx={{ padding: "0" }}>
                        <ListItemButton>
                          <ListItemIcon style={{ minWidth: "2.5rem" }}>
                            <ManageAccountsIcon />
                          </ListItemIcon>
                          <NavLink
                            className="nav-link-liked-mentors"
                            to={"/mentors/liked-mentors"}
                            style={({ isActive }) =>
                              isActive ? activeStyle : noActive
                            }
                          >
                            <ListItemText
                              className="liked-mentors-text"
                              primary="Favorit Mentors"
                            />
                          </NavLink>
                        </ListItemButton>
                      </ListItem>
                    )}
                  </>
                )}
              </List>
            </Menu>
          </div>

          {/* ----------------- logout  Icon--------------------- */}
          {/* {user ? ( */}
          <Box
            sx={{
              textAlign: "center",
              display: "inline-flex",
              cursor: "pointer",
            }}
            onClick={handleLogoutClick}
          >
            {token && <LogoutIcon fontSize="small" />}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer drawerKey={drawerKey} setDrawerKey={setDrawerKey} />
    </Box>
  );
}
