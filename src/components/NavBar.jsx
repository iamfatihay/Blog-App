import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/logo.gif";
import useAuthCall from "../hooks/useAuthCalls";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";
import {
    Dashboard,
    Add,
    Info,
    Person,
    Article,
    Login,
    Logout,
} from "@mui/icons-material";

function NavBar() {
    const navigate = useNavigate();
    const { currentUser, image } = useSelector((state) => state.auth);
    const { logout } = useAuthCall();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigation = (endpoint) => {
        navigate(`/${endpoint}`);
        handleCloseNavMenu();
        handleCloseUserMenu();
    };
    const handleClick = () => {
        logout();
        handleCloseUserMenu();
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ py: 1 }}>
                    {/* Logo - Desktop */}
                    <Box
                        onClick={() => handleNavigation("")}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            cursor: "pointer",
                            transition: "transform 0.2s ease",
                            "&:hover": {
                                transform: "scale(1.05)",
                            },
                        }}
                    >
                        <img src={logo} alt="Blog App" width="120px" />
                    </Box>

                    {/* Mobile Menu Button */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{ color: "primary.main" }}
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
                                "& .MuiPaper-root": {
                                    borderRadius: 2,
                                    mt: 1,
                                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                },
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleNavigation("");
                                    handleCloseNavMenu();
                                }}
                            >
                                <Dashboard sx={{ mr: 1 }} />
                                Dashboard
                            </MenuItem>
                            {currentUser && (
                                <MenuItem
                                    onClick={() => {
                                        handleNavigation("newblog");
                                        handleCloseNavMenu();
                                    }}
                                >
                                    <Add sx={{ mr: 1 }} />
                                    New Blog
                                </MenuItem>
                            )}
                            <MenuItem
                                onClick={() => {
                                    handleNavigation("about");
                                    handleCloseNavMenu();
                                }}
                            >
                                <Info sx={{ mr: 1 }} />
                                About
                            </MenuItem>
                        </Menu>
                    </Box>

                    {/* Logo - Mobile */}
                    <Box
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            justifyContent: "center",
                        }}
                    >
                        <img src={logo} alt="Blog App" width="80px" />
                    </Box>

                    {/* Desktop Navigation */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            gap: 1,
                        }}
                    >
                        <Button
                            onClick={() => handleNavigation("")}
                            startIcon={<Dashboard />}
                            sx={{
                                color: "primary.main",
                                fontWeight: 500,
                                "&:hover": {
                                    backgroundColor: "primary.50",
                                    color: "primary.dark",
                                },
                            }}
                        >
                            Dashboard
                        </Button>
                        {currentUser && (
                            <>
                                <Button
                                    onClick={() => handleNavigation("newblog")}
                                    startIcon={<Add />}
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: 500,
                                        "&:hover": {
                                            backgroundColor: "primary.50",
                                            color: "primary.dark",
                                        },
                                    }}
                                >
                                    New Blog
                                </Button>
                                <Button
                                    onClick={() => handleNavigation("my-blogs")}
                                    startIcon={<Article />}
                                    sx={{
                                        color: "primary.main",
                                        fontWeight: 500,
                                        "&:hover": {
                                            backgroundColor: "primary.50",
                                            color: "primary.dark",
                                        },
                                    }}
                                >
                                    My Blogs
                                </Button>
                            </>
                        )}
                        <Button
                            onClick={() => handleNavigation("about")}
                            startIcon={<Info />}
                            sx={{
                                color: "primary.main",
                                fontWeight: 500,
                                "&:hover": {
                                    backgroundColor: "primary.50",
                                    color: "primary.dark",
                                },
                            }}
                        >
                            About
                        </Button>
                    </Box>

                    {/* User Menu */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={currentUser ? "Account" : "Login"}>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{
                                    p: 0,
                                    border: "2px solid transparent",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        border: "2px solid primary.main",
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                <Avatar
                                    alt={currentUser || "User"}
                                    src={currentUser ? image : avatar}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        border: "2px solid rgba(14, 165, 233, 0.1)",
                                    }}
                                />
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
                            PaperProps={{
                                sx: {
                                    borderRadius: 2,
                                    mt: 1,
                                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                                    minWidth: 180,
                                },
                            }}
                        >
                            {currentUser ? (
                                <>
                                    <MenuItem
                                        onClick={() => {
                                            handleNavigation("profile");
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Person sx={{ mr: 1, fontSize: 20 }} />
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleNavigation("my-blogs");
                                            handleCloseUserMenu();
                                        }}
                                    >
                                        <Article sx={{ mr: 1, fontSize: 20 }} />
                                        My Blogs
                                    </MenuItem>
                                    <MenuItem onClick={handleClick}>
                                        <Logout sx={{ mr: 1, fontSize: 20 }} />
                                        Logout
                                    </MenuItem>
                                </>
                            ) : (
                                <MenuItem
                                    onClick={() => {
                                        handleNavigation("login");
                                        handleCloseUserMenu();
                                    }}
                                >
                                    <Login sx={{ mr: 1, fontSize: 20 }} />
                                    Login
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
