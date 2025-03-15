import React from 'react'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { useAuth } from '.././hooks/UseAuth';
import "../../App.css";
import User from '../user/User';
import { useNavigate } from 'react-router-dom';
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Toaster, toast } from "sonner";

const Sidebar = ({ open, toggleDrawer }) => {

    const { authData, setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
        setAuth(null);
        toast.success("Logout Successful");
    };

    const account = () => {
        navigate("/account");
    };

    const DrawerList = (
        <Box
            sx={{
                backgroundColor: "#3e3e3e",
                width: {
                    xs: 190,
                    sm: 250,
                    md: 250,
                    lg: 250,
                    xl: 250,
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            {!authData ? (
                <>
                    <Button color="primary" variant="contained">
                        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
                            Home
                        </Link>
                    </Button>
                    <Button color="primary" variant="contained">
                        <Link className="login-link" to={"/login"}>
                            Login
                        </Link>
                    </Button>
                    <Button color="primary" variant="contained">
                        <Link className="login-link" to={"/register"}>
                            Register
                        </Link>
                    </Button>
                </>
            ) : (
                <>
                    <User user={authData?.user} />
                    <Button color="primary" variant="contained">
                        <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
                            Home
                        </Link>
                    </Button>
                    <Button color="primary" variant="contained" onClick={account}>
                        My Account
                    </Button>
                    <Button color="primary" variant="contained" onClick={logout}>
                        Logout
                    </Button>
                </>
            )}
        </Box>
    );

    return (
        <div className="sidebar">
            <Toaster richColors position="top-right" />
            <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)} edge="start" sx={{ paddingBottom: "0" }}>
                <MenuIcon sx={{ fontSize: "2.2rem" }} />
            </IconButton>
            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                sx={{ "& .css-4t3x6l-MuiPaper-root-MuiDrawer-paper": { color: "#fff" } }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default Sidebar