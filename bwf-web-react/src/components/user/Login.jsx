import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../App.css";
// material ui
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import { Toaster, toast } from "sonner";
import { auth } from '../services/UserServices';
import { useAuth } from '../hooks/UseAuth';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {authData, setAuth} = useAuth();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await auth({ username, password });
            setAuth(data);
            if (data?.user) {
                navigate("/account");
                toast.success("Welcome back, Login Successful");
            } else {
                toast.error("Invalid Credentials, try again");
            }
        } catch (error) {
            console.log(error.message, "Something went wrong!, failed to login");
        }
    }

    return (
        <div>
            <Toaster richColors position="top-right" />
            <Link
                style={{
                    textDecoration: "none",
                    textAlign: "start",
                    color: "white",
                    display: "block",
                    width: "fit-content",
                }}
                to={"/"}
            >
                <ArrowBackIcon />
            </Link>
            <div className="login-form">
                {!authData ? (
                    <form action="" onSubmit={handleSubmit}>
                        <Typography
                            m={2}
                            variant="h4"
                            sx={{
                                fontSize: {
                                    xs: "1.3rem",
                                    sm: "1.7rem",
                                    md: "2rem",
                                    lg: "2.125rem",
                                    xl: "2.125rem",
                                },
                            }}
                        >
                            Login here
                        </Typography>
                        <Box
                            sx={{
                                width: {
                                    xs: "auto",
                                    sm: "auto",
                                    md: 500,
                                    lg: 500,
                                    xl: 500,
                                },
                                maxWidth: "100%",
                                margin: "auto",
                                marginTop: "20px",
                                marginBottom: "20px",

                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "white", // Default border color
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#fecc01", // Border color on hover
                                    },
                                },
                                "& .MuiInputBase-input": {
                                    color: "white", // Use default or inherited color
                                    "&.Mui-focused": {
                                        color: "#fecc01", // Label color when focused
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: "white", // Use default or inherited color
                                },
                            }}
                        >
                            <Stack spacing={2} justifyContent="center" alignItems="center">
                                <TextField
                                    id="outlined-basic"
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />

                                <FormControl
                                    sx={{
                                        // width: 500,
                                        maxWidth: "100%",
                                        borderColor: "white",
                                    }}
                                    variant="outlined"
                                    fullWidth
                                >
                                    <InputLabel
                                        sx={{
                                            color: "white",
                                            "&.Mui-focused": {
                                                color: "#fecc01",
                                            },
                                        }}
                                        htmlFor="outlined-adornment-password"
                                    >
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    sx={{ color: "white" }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                        fullWidth
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </FormControl>
                            </Stack>
                        </Box>
                        <Button color="primary" variant="contained" type="submit">
                            Login
                        </Button>
                        <Typography
                            m={2}
                            variant="h5"
                            sx={{
                                fontSize: {
                                    xs: "1.1rem", // 0px - 600px
                                    sm: "1.25rem", // 600px - 900px
                                    md: "1.25rem", // 900px - 1200px
                                    lg: "1.5rem", // 1200px - 1536px
                                    xl: "1.5rem", // 1536px and up
                                },
                            }}
                        >
                            Don't you have an account?{" "}
                            <Link className="login-link" to={"/register"}>
                                Register
                            </Link>
                        </Typography>
                    </form>
                ) : (
                    <Typography variant="h4">Welcome {authData?.user?.username}</Typography>
                )}
            </div>
        </div>
    );
}

export default Login