import React from 'react'
import { DateTime } from "luxon";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

const EventList = ({ events }) => {

    const navigate = useNavigate();

    const openEvent = (eventId) => {
        navigate(`/event/${eventId}`)
    }

    return (
        <div>
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
                Events
            </Typography>
            {events.length > 0 ? (
                <Stack spacing={2} mb={2} flexDirection="row" justifyContent="center" flexWrap="wrap" alignItems="center">
                    {events?.map((event) => {
                        const format = "yyyy-mm-dd'T'hh:mm:ss'Z'";

                        const evtTime = DateTime.fromFormat(event.time, format);

                        return (
                            <div
                                style={{ marginTop: "0", flexGrow: 1, width: "fit-content" }}
                                key={event.id}
                                onClick={() => openEvent(event.id)}
                            >
                                <Stack justifyContent="center" alignItems="center">
                                    <Card
                                        variant="outlined"
                                        color="secondary"
                                        sx={{
                                            backgroundColor: "#3e3e3e",
                                            margin: "1rem",
                                            color: "white",
                                            padding: "1rem",
                                            cursor: "pointer",

                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                                boxShadow: 6,
                                                border: "3px solid #fecc01",
                                            },
                                        }}
                                    >
                                        <CardContent>
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
                                                {event.team1} vs {event.team2}
                                            </Typography>
                                            <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <CalendarMonthOutlinedIcon style={{ marginRight: "5px" }} />
                                                Date - {evtTime.toSQLDate()}
                                            </p>
                                            <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <AccessTimeOutlinedIcon style={{ marginRight: "5px" }} />
                                                Time - {evtTime.toFormat("hh:mm a")}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </div>
                        );
                    })}
                </Stack>
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
                    No Events available
                </Typography>
            )}
        </div>
    );
}

export default EventList