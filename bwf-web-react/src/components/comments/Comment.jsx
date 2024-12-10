import React from 'react'
import User from '../user/User'
import { DateTime } from "luxon";
import { Paper, Typography, Box } from "@mui/material";

const Comment = ({comment, user}) => {

    const cmtTime = DateTime.fromISO(comment?.time);

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 4, marginBottom: "1rem"}}>
            <User user={user} />
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#3e3e3e", color: "white", flexGrow: 1,}}>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                    <Typography variant="body1">{comment?.description}</Typography>
                    <Typography variant="body2" color="#c1c8d3">
                        {cmtTime.toFormat("yyyy-MM-dd hh:mm a")}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default Comment