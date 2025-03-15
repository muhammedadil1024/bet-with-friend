import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, TextField } from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createEvent } from '../services/EventServices';
import { useAuth } from '../hooks/UseAuth';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { Toaster, toast } from "sonner";
import { DateTime } from "luxon";
import dayjs from 'dayjs';

const EventForm = () => {

    const location = useLocation();
    const { group } = location.state;
    const { authData } = useAuth();
    const navigate = useNavigate();

    const [homeTeam, setHomeTeam] = useState('');
    const [awayTeam, setAwayTeam] = useState('');
    const [dateTime, setDateTime] = useState(dayjs()); // we are using adapterJs, so we need to use dayjs instead of - new Date()

    const handleDateTimeChange = (date) => {
        setDateTime(date)
        console.log(dateTime);
    };

    const createNewEvent = async (e) => {
        e.preventDefault();
        try {
            // Convert the dayjs object to a JS Date and then to a Luxon DateTime instance
            const localCurrentDateTime = DateTime.fromJSDate(dateTime.toDate());
            console.log(localCurrentDateTime);

            // Convert local time to UTC
            const utcDateTime = localCurrentDateTime.toUTC();
            console.log(utcDateTime);

            const response = await createEvent(
                { team1: homeTeam, team2: awayTeam, time: utcDateTime.toISO(), group: group?.id },
                authData?.token
            );
            if (response) {
                toast.success(response.message);
                navigate(`/details/${group.id}`);
            } else {
                toast.error("Error, Event not created");
            }
        } catch (error) {
            console.error("Error creating event:", error.message);
        }
    }

    return (
        <div>
            <Toaster richColors position="top-right" />
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ color: "white" }}>
                <Link
                    style={{
                        textDecoration: "none",
                        textAlign: "start",
                        color: "white",
                        display: "block",
                        width: "fit-content",
                    }}
                    to={`/details/${group.id}`}
                >
                    <ArrowBackIcon />
                </Link>
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
                    Event Creation Form - Group{group.id}
                </Typography>
                <Box
                    component="form"
                    sx={{
                        width: {
                            xs: "auto",
                            sm: "auto",
                            md: 500,
                            lg: 500,
                            xl: 500,
                        },
                        margin: "auto",
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
                    noValidate
                    autoComplete="off"
                >
                    <Stack spacing={2} justifyContent="center" alignItems="center">
                        <TextField fullWidth label="Home Team" onChange={(e) => setHomeTeam(e.target.value)} required />
                        <TextField fullWidth label="Away Team" onChange={(e) => setAwayTeam(e.target.value)} required />
                        <DateTimePicker
                            required
                            sx={{
                                width: {
                                    xs: "auto",
                                    sm: "auto",
                                    md: 500,
                                    lg: 500,
                                    xl: 500,
                                },
                                color: "white",
                                "& .MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}
                            label="Date and Time of Event"
                            onChange={handleDateTimeChange}
                            fullWidth
                        />
                        <Button onClick={createNewEvent} variant="contained" color="primary">
                            Create Event
                        </Button>
                    </Stack>
                </Box>
            </LocalizationProvider>
        </div>
    );
}

export default EventForm