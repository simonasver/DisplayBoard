import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

const title = "Display Board";

const navButtons: { title: string; url: string; logged: boolean }[] = [
  { title: "Home", url: "/", logged: false },
  { title: "Make reservation", url: "/visitReservation", logged: false },
  { title: "Check visit", url: "/visitCheck", logged: false },
  { title: "My visits", url: "/myvisits", logged: true },
];

const profileButtons: { title: string; url: string }[] = [
  { title: "Logout", url: "/logout" },
];

const Header = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const onHandleNavMenuPress = (address: string) => {
    navigate(address);
    handleCloseNavMenu();
  };

  const onHandleUserMenuPress = (address: string) => {
    navigate(address);
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DescriptionIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navButtons.map((item) => {
                if ((item.logged && user) || !item.logged) {
                  return (
                    <MenuItem
                      key={item.title}
                      onClick={() => onHandleNavMenuPress(item.url)}
                    >
                      <Typography textAlign="center">{item.title}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
          <DescriptionIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navButtons.map((item) => {
              if ((item.logged && user) || !item.logged) {
                return (
                  <Button
                    key={item.title}
                    onClick={() => onHandleNavMenuPress(item.url)}
                    sx={{ my: 2, color: "inherit", display: "block" }}
                  >
                    {item.title}
                  </Button>
                );
              }
            })}
          </Box>

          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user?.userName} src={""} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {profileButtons.map((item) => (
                  <MenuItem
                    key={item.title}
                    onClick={() => onHandleUserMenuPress(item.url)}
                  >
                    <Typography textAlign="center">{item.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {!user && (
            <Box sx={{ flexGrow: 0, flexDirection: "row" }}>
              <Button
                key="login"
                sx={{ my: 2, color: "white" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
