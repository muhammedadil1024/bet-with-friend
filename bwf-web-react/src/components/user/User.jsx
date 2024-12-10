import React from 'react'
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const User = ({user}) => {

    return (
        <Box>
            <Stack spacing={2} justifyContent="center" alignItems="center">
                <Avatar
                    alt="User avatar"
                    // TODO: need to change the url after we host this project 
                    src={user?.profile?.image && `http://127.0.0.1:8000${user?.profile?.image}`}
                    sx={{ width: 56, height: 56 }}
                />
                <Typography 
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
                    {user?.username}
                </Typography>
            </Stack>
        </Box>
    );
}

export default User
User.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            image: PropTypes.string,
        }).isRequired,
    }).isRequired,
};