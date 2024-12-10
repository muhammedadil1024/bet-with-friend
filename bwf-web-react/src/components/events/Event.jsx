import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchEvent } from "../hooks/FetchEvent";
import { useAuth } from "../hooks/UseAuth";
import { DateTime } from "luxon";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import User from "../user/User";
import { Box, Button, TextField } from "@mui/material";
import { sendBet } from "../services/EventServices";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { Toaster, toast } from "sonner";
import "../../App.css";

const Event = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const { authData } = useAuth();
    const [data, loading] = useFetchEvent(authData?.token, id);
    const [event, setEvent] = useState(null);
    const [evtTime, setEvtTime] = useState(null);
    const [scoreHome, setScoreHome] = useState('')
    const [scoreAway, setScoreAway] = useState('')

    useEffect(() => {
        setEvent(data);
        if (data?.time) {
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
            setEvtTime(DateTime.fromFormat(data.time, format));
        }
    }, [data]);

    const placeBet = async () => {
        try {
            if (authData?.user) {
                const bet = await sendBet(authData?.token, { scoreHome, scoreAway, event: event?.id });
                if (bet) {
                    if (bet.new) {
                        event?.bets.push(bet.result);
                        toast.success(bet.message);
                    } else {
                        const betIndex = event?.bets.findIndex((elmnt) => elmnt.user.id === bet?.result?.user?.id);
                        event.bets[betIndex] = bet.result;
                        toast.success(bet.message);
                    }
                    setScoreHome("");
                    setScoreAway("");
                } else {
                    toast.error("Sorry!, you cant place bet. Time out");
                }
            } else {
                navigate("/login");
                toast.info("Please Login");
            }
        } catch (error) {
            console.log(error.message, "Something went wrong!, Failed to place Bet.")
        }
    }

    return (
        <div>
            <Toaster richColors position="top-right" />
            {loading ? (
                <Typography variant="h5">Data is loading...</Typography>
            ) : (
                <div>
                    <Link
                        style={{
                            textDecoration: "none",
                            textAlign: "start",
                            color: "white",
                            display: "block",
                            width: "fit-content",
                        }}
                        to={`/details/${event?.group}`}
                    >
                        <ArrowBackIcon />
                    </Link>
                    {authData?.user ? (
                        <Box
                            sx={{
                                padding: {
                                    xs: "0.7rem",
                                    sm: "2rem",
                                    md: "2rem",
                                    lg: "2rem",
                                    xl: "2rem",
                                },
                                margin: {
                                    xs: "0",
                                    sm: "1rem",
                                    md: "1rem",
                                    lg: "1rem",
                                    xl: "1rem",
                                },
                                border: "2px solid #fecc01",
                                marginBottom: "2rem",
                                borderRadius: "10px",
                            }}
                        >
                            <div>
                                <Typography
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
                                    {event?.team1} <span>vs</span> {event?.team2}
                                </Typography>
                                <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <CalendarMonthOutlinedIcon style={{ marginRight: "5px" }} />
                                    Date - {evtTime?.toSQLDate()}
                                </p>
                                <p style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <AccessTimeOutlinedIcon style={{ marginRight: "5px" }} />
                                    Time - {evtTime?.toFormat("hh:mm a")}
                                </p>
                                {event?.score1 && event?.score1 >= 0 && event?.score2 >= 0 && (
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            margin: "auto",
                                            border: "2px solid #fecc01",
                                            width: "fit-content",
                                            padding: "1rem",
                                            borderRadius: "6px",
                                            fontSize: {
                                                xs: "1.1rem", // 0px - 600px
                                                sm: "1.25rem", // 600px - 900px
                                                md: "1.25rem", // 900px - 1200px
                                                lg: "1.5rem", // 1200px - 1536px
                                                xl: "1.5rem", // 1536px and up
                                            },
                                        }}
                                    >
                                        {event?.team1.slice(0, 3)} : {event?.score1} - {event?.score2} :{" "}
                                        {event?.team2.slice(0, 3)}
                                    </Typography>
                                )}
                                {event?.score1 &&
                                    (event?.score1 > event?.score2 ? (
                                        <Alert
                                            variant="filled"
                                            severity="success"
                                            sx={{
                                                width: "fit-content",
                                                margin: "auto",
                                                marginTop: "1rem",
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            {event?.team1} Won the Match
                                        </Alert>
                                    ) : (
                                        <Alert
                                            variant="filled"
                                            severity="success"
                                            sx={{
                                                width: "fit-content",
                                                margin: "auto",
                                                marginTop: "1rem",
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            {event?.team2} Won the Match
                                        </Alert>
                                    ))}
                            </div>
                            <div>
                                <Stack
                                    mb={2}
                                    flexDirection="row"
                                    justifyContent="center"
                                    flexWrap="wrap"
                                    alignItems="center"
                                    gap={3}
                                >
                                    {event?.bets?.map((bet) => {
                                        return (
                                            <div key={bet.id}>
                                                <Stack
                                                    // spacing={2}
                                                    // mb={2}
                                                    justifyContent="center"
                                                    flexWrap="wrap"
                                                    alignItems="center"
                                                    sx={{
                                                        border: "2px solid #fecc01",
                                                        padding: "10px",
                                                        borderRadius: "8px",
                                                    }}
                                                >
                                                    <User user={bet.user} />
                                                    <Typography
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
                                                        {event?.team1.slice(0, 3)} - {bet.score1}
                                                    </Typography>
                                                    <Typography
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
                                                        {event?.team2.slice(0, 3)} - {bet.score2}
                                                    </Typography>
                                                </Stack>
                                            </div>
                                        );
                                    })}
                                </Stack>
                            </div>
                        </Box>
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
                            No Data available, Please{" "}
                            <Link className="login-link" to={"/login"}>
                                Login
                            </Link>
                        </Typography>
                    )}
                    <hr color="#fecc01" />
                    <Typography
                        m={1}
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
                        Enter your Bet
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
                            <TextField
                                id="outlined-basic"
                                label="Score(Home)"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setScoreHome(e.target.value)}
                                type="number"
                                required
                            />

                            <TextField
                                id="outlined-basic"
                                label="Score(Away)"
                                variant="outlined"
                                fullWidth
                                onChange={(e) => setScoreAway(e.target.value)}
                                type="number"
                                required
                            />
                        </Stack>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => placeBet()}
                        disabled={!scoreHome || !scoreAway}
                    >
                        Place Bet
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Event;