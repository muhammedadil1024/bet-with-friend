import React, { useState } from "react";
import Comment from "./Comment";
import { Button, TextField } from "@mui/material";
import { postComment } from "../services/GroupServices";
import { useAuth } from "../hooks/UseAuth";
import Typography from "@mui/material/Typography";

import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Comments = ({ group }) => {

    const [newComment, setNewComment] = useState('')

    const { authData } = useAuth();

    const navigate = useNavigate();

    const getUser = (userId) => {
        return group?.members?.find((member) => member?.user?.id === userId)?.user;
    };

    const sendComment = async () => {
        try {
            const response = await postComment(authData?.token, newComment, group?.id, authData?.user?.id)
            if (response?.user) {
                setNewComment('')
                group?.comments?.unshift(response);
                toast.success('Comment added successfully')
            } else {
                navigate("/login");
                toast.info("Please Login");
            }
        } catch (error) {
            console.error(error, "Something went wrong!, Failed add Comment.");
        }  
    }

    return (
        <div>
            <Toaster richColors position="top-right" />
            <hr color="fecc01" />
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
                Comments
            </Typography>
            <div>
                <TextField
                    sx={{
                        marginBottom: "15px",
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
                    label="Add New Comment"
                    multiline
                    fullWidth
                    rows={4}
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                    onClick={sendComment}
                    disabled={!newComment}
                    sx={{ marginBottom: "20px" }}
                    variant="contained"
                    color="primary"
                >
                    Send Comment
                </Button>
            </div>

            {group?.comments.length > 0 ? (
                group.comments.map((comment, index) => (
                    <div key={index}>
                        <Comment comment={comment} user={getUser(comment?.user)} />
                    </div>
                ))
            ) : (
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
                    No Comments available
                </Typography>
            )}
        </div>
    );
};

export default Comments;
