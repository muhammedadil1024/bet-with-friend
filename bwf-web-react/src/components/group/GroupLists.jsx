import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getGroups } from '../services/GroupServices';
import { Box } from '@mui/material';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const GroupLists = () => {

    const [groups, setGroups] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            await getGroups()
                .then((data) => {
                    setGroups(data);
                    setLoading(false);
                })
                .catch((error) => console.error(error));
        };

        getData();
    }, []);

    return (
        <div>
            <header>
                {loading ? (
                    <Typography variant="h5">Data is Loading...</Typography>
                ) : (
                    groups && (
                        <div>
                            <Typography
                                m={2}
                                variant="h3"
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
                                Available Betting Groups
                            </Typography>
                            {groups.map((group) => (
                                <div key={group.id}>
                                    <Box>
                                        <Card
                                            variant="outlined"
                                            color="secondary"
                                            sx={{ backgroundColor: "#3e3e3e", margin: "1rem", marginBottom: "2rem" }}
                                        >
                                            <CardContent
                                                sx={{
                                                    "&:last-child": {
                                                        paddingBottom: "16px",
                                                    },
                                                }}
                                            >
                                                <Link
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "white",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                    }}
                                                    to={`/details/${group.id}`}
                                                >
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            flexGrow: 1,
                                                            fontSize: {
                                                                xs: "1.1rem", // 0px - 600px
                                                                sm: "1.25rem", // 600px - 900px
                                                                md: "1.25rem", // 900px - 1200px
                                                                lg: "1.5rem", // 1200px - 1536px
                                                                xl: "1.5rem", // 1536px and up
                                                            },
                                                        }}
                                                    >
                                                        {group.name}
                                                    </Typography>
                                                    <ArrowForwardIcon sx={{ flexShrink: 0 }} />
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </Box>
                                </div>
                            ))}
                            <Typography
                                mt={2}
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
                                About Us
                            </Typography>
                            <Box
                                sx={{
                                    margin: "1rem 0 1rem 0",
                                    border: "2px solid #fecc01",
                                    borderRadius: "5px",
                                    padding: "1rem",
                                    textAlign: "start",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.1rem",
                                            md: "1.1rem",
                                            lg: "1.25rem",
                                            xl: "1.25rem",
                                        },
                                    }}
                                >
                                    Welcome to <i>Bet With Friends</i>, your ultimate destination for friendly and engaging
                                    sports betting! Whether you're a football fanatic or a cricket connoisseur, our platform
                                    allows you to place bets with your friends on your favorite matches and events. At Bet
                                    With Friends, we aim to create a fun and interactive environment where sports
                                    enthusiasts can challenge each other, share their predictions, and experience the thrill
                                    of betting in a secure and user-friendly platform.
                                </Typography>
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.1rem",
                                            md: "1.1rem",
                                            lg: "1.25rem",
                                            xl: "1.25rem",
                                        },
                                    }}
                                >
                                    Key Features of Bet With Friends:
                                </Typography>
                                <List>
                                    <ListItem
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1rem",
                                                md: "1rem",
                                                lg: "1rem",
                                                xl: "1rem",
                                            },
                                        }}
                                    >
                                        User Authentication: Secure login and account management, including profile picture
                                        uploads and password resetting.
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1rem",
                                                md: "1rem",
                                                lg: "1rem",
                                                xl: "1rem",
                                            },
                                        }}
                                    >
                                        Join Group: Authenticated users can join any available betting groups
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1rem",
                                                md: "1rem",
                                                lg: "1rem",
                                                xl: "1rem",
                                            },
                                        }}
                                    >
                                        Event Creation: Authorized users can create new betting events, adding to the
                                        excitement.
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1rem",
                                                md: "1rem",
                                                lg: "1rem",
                                                xl: "1rem",
                                            },
                                        }}
                                    >
                                        Betting: Authenticated users can place bets on listed events, making every match
                                        more thrilling.
                                    </ListItem>
                                    <ListItem
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1rem",
                                                md: "1rem",
                                                lg: "1rem",
                                                xl: "1rem",
                                            },
                                        }}
                                    >
                                        Group Comments: Engage with friends by adding comments within your betting groups,
                                        enhancing the social experience.
                                    </ListItem>
                                </List>
                            </Box>
                        </div>
                    )
                )}
            </header>
        </div>
    );
}

export default GroupLists