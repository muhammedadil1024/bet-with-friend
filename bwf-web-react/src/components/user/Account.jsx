import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField } from '@mui/material';
import { changePassword, uploadAvatar } from '../services/UserServices';
import { useAuth } from '../hooks/UseAuth';
// mui
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import { Toaster, toast } from "sonner";

const Account = () => {

    const [image, setImage] = useState()
    const { authData } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [ConfPassword, setConfPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    // const [open, setOpen] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        try {
            const uploadData = new FormData();
            uploadData.append("image", image, image?.name);

            const uploadItem = await uploadAvatar(authData?.user?.profile?.id, uploadData);
            if (uploadItem) {
                toast.success("File Uploaded Successfully");
            } else {
                toast.error("Error occurred when Uploading");
            }
        } catch (error) {
            console.log(error.message, "Something went wrong!, failed to Upload image");
        }
    }

    const submitChangePass = async (e) => {
        e.preventDefault();
        try {
            if (password === ConfPassword) {
                const passwordData = await changePassword(
                    { old_password: oldPassword, new_password: password },
                    authData?.user?.id,
                    authData?.token
                );
                if (passwordData) {
                    setErrorMessage(""); // Clear error message if it was previously set
                    setSuccessMessage("Password Changed successfully!");
                }
            } else {
                setErrorMessage("Password not matching. Please try again.");
                setSuccessMessage("");
            }
        } catch (error) {
            console.log(error.message, "Something went wrong!, failed Change password")
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
            <Typography
                mb={2}
                variant="h4"
                sx={{
                    fontSize: {
                        xs: "1.5rem", // 0px - 600px
                        sm: "2rem", // 600px - 900px
                        md: "2.25rem", // 900px - 1200px
                        lg: "2.5rem", // 1200px - 1536px
                        xl: "3rem", // 1536px and up
                    },
                }}
            >
                Manage Account
            </Typography>

            <label htmlFor="">
                <Typography
                    m={1}
                    variant="h6"
                    sx={{
                        fontSize: {
                            xs: "1rem", // 0px - 600px
                            sm: "1.25rem", // 600px - 900px
                            md: "1.25rem", // 900px - 1200px
                            lg: "1.25rem", // 1200px - 1536px
                            xl: "1.25rem", // 1536px and up
                        },
                    }}
                >
                    Upload your avatar
                </Typography>
            </label>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                }}
            >
                <TextField
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    sx={{
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
                    required
                />

                <Button
                    type="submit"
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={uploadFile}
                >
                    Upload file
                </Button>
            </Box>
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
                Change password
            </Typography>
            {errorMessage && toast.error(errorMessage)}
            {successMessage && toast.success(successMessage)}
            <div>
                <form action="" onSubmit={submitChangePass}>
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
                                    Old Password
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
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                            </FormControl>

                            <FormControl
                                sx={{
                                    // width: 500,
                                    maxWidth: "100%",
                                    borderColor: "white",
                                }}
                                fullWidth
                                variant="outlined"
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
                                    New Password
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </FormControl>

                            <FormControl
                                sx={{
                                    // width: 500,
                                    maxWidth: "100%",
                                    borderColor: "white",
                                }}
                                fullWidth
                                variant="outlined"
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
                                    Confirm Password
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
                                    onChange={(e) => setConfPassword(e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Stack>
                    </Box>
                    <Button color="primary" variant="contained" type="submit">
                        Change Password
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Account