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
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { AppContext } from "../contexts/appContext";
import Drawer from "../components/Drawer";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MenuIcon from "@mui/icons-material/Menu";
import { getToken } from "../utils/getToken";
import jwt_decode from "jwt-decode";

// import { signOut } from "firebase/auth";

export default function NavBar() {
  const [drawerKey, setDrawerKey] = React.useState(false);
  const [decodedToken, setDecodedToken] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { handleLogoutClick, isUserLoggedIn } = React.useContext(AppContext);

  const token = localStorage.getItem("token");

  // -------- Check is User logged in starts ----------
  React.useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setDecodedToken(decodeToken);
    } else {
      setDecodedToken("");
    }
  }, []);

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
                  decodedToken && decodedToken.role === "mentee" ? "#2fd373"
                    : decodedToken.role === 'mentor' ? "orange"
                    : 'black'
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
                  <ListItem disablePadding>
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
              {/* )} */}

              {/* ----------------- Sign Up Page && Profile Link  --------------------- */}

              {/* {!user && ( */}
              {/* {!token && ( */}
              <List onClick={handleClose}>
                <ListItem disablePadding>
                  <ListItemButton>
                    {!isUserLoggedIn && (
                      <>
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
                      </>
                    )}

                    {isUserLoggedIn && (
                      <>
                        <ListItemIcon style={{ minWidth: "2.5rem" }}>
                          <ManageAccountsIcon />
                        </ListItemIcon>
                        <NavLink
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
                          <ListItemText primary="Profile" />
                        </NavLink>
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
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
          {/* ) : ( */}
          {/* "" */}
          {/* )} */}
        </Toolbar>
      </AppBar>
      <Drawer
        // toggleDrawer={toggleDrawer}
        // onClose={toggleDrawer('false')}
        // onClose={() => setOpen(false)}
        // open={open}
        drawerKey={drawerKey}
        setDrawerKey={setDrawerKey}
      />
    </Box>
  );
}
