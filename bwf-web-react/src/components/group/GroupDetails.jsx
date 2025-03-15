import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFechGroup } from '../hooks/FetchGroup';
import User from '../user/User'
import Button from "@mui/material/Button";
import { joinGroup, leaveGroup } from "../services/GroupServices";
import { useAuth } from '../hooks/UseAuth';
import Comments from '../comments/Comments';
import EventList from '../events/EventList';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { Toaster, toast } from "sonner";

const GroupDetails = () => {

    const { id } = useParams();

    const [ data, loading ] = useFechGroup(id)

    const [group, setGroup] = useState(null)

    const { authData } = useAuth();

    const navigate = useNavigate();

    const [inGroup, setInGroup] = useState(false)

    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        // authorising user
        if(data?.members){
            if(authData?.user){
                setInGroup(!!data?.members?.find(member => member.user?.id === authData?.user?.id))
                setIsAdmin(data?.members?.find(member => member.user?.id === authData?.user?.id)?.admin)
            }
        }
        setGroup(data)
    }, [data, authData]);


    // for joining a group
    const joinHere = async () => {
        try {
            const response = await joinGroup({ user: authData?.user?.id, group: group?.id }, authData?.token);
            if (response) {
                toast.success(response.message);
            } else {
                navigate("/login");
                toast.info("Please Login");
            }
        } catch (error) {
            console.log(error.message, "Something went wrong!, Failed to Join to Group.")
        }
    }

    // for leaving a group
    const leaveHere = async () => {
        try {
            const response = await leaveGroup({ user: authData.user.id, group: group.id }, authData?.token);
            if (response) {
                toast.success(response.message);
            }
        } catch (error) {
            console.log(error.message, "Something went wrong!, Failed to Leave group.")
        }
    };

    // navigating to event creation form
    const addEvent = () => {
        navigate('/event-form', { state: { group } }); 
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
            {loading ? (
                <Typography variant="h5">Data is loading...</Typography>
            ) : (
                group && (
                    <div>
                        <Stack
                            gap={2}
                            m={1}
                            mb={4}
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            flexWrap="wrap"
                        >
                            <Typography
                                sx={{
                                    border: "1px solid white",
                                    padding: "1rem",
                                    borderRadius: "5px",
                                    color: "#fecc01",
                                    fontSize: {
                                        xs: "1.1rem", // 0px - 600px
                                        sm: "1.25rem", // 600px - 900px
                                        md: "1.25rem", // 900px - 1200px
                                        lg: "1.5rem", // 1200px - 1536px
                                        xl: "1.5rem", // 1536px and up
                                    },
                                }}
                                variant="h5"
                                flexGrow="1"
                            >
                                Group Name - {group.name}
                            </Typography>
                            <Typography
                                sx={{
                                    border: "1px solid white",
                                    padding: "1rem",
                                    marginTop: "0",
                                    borderRadius: "5px",
                                    color: "#fecc01",
                                    fontSize: {
                                        xs: "1.1rem", // 0px - 600px
                                        sm: "1.25rem", // 600px - 900px
                                        md: "1.25rem", // 900px - 1200px
                                        lg: "1.5rem", // 1200px - 1536px
                                        xl: "1.5rem", // 1536px and up
                                    },
                                }}
                                variant="h5"
                                flexGrow="1"
                            >
                                Location - {group.location}
                            </Typography>
                            <Typography
                                sx={{
                                    border: "1px solid white",
                                    padding: "1rem",
                                    marginTop: "0",
                                    borderRadius: "5px",
                                    color: "#fecc01",
                                    fontSize: {
                                        xs: "1.1rem", // 0px - 600px
                                        sm: "1.25rem", // 600px - 900px
                                        md: "1.25rem", // 900px - 1200px
                                        lg: "1.5rem", // 1200px - 1536px
                                        xl: "1.5rem", // 1536px and up
                                    },
                                }}
                                variant="h5"
                                flexGrow="1"
                            >
                                Description - {group.description}
                            </Typography>
                        </Stack>
                        <div>
                            {inGroup ? (
                                <Button sx={{ margin: "0.75rem" }} onClick={leaveHere} variant="contained" color="primary">
                                    Leave Group
                                </Button>
                            ) : (
                                <Button sx={{ margin: "1rem" }} onClick={joinHere} variant="contained" color="secondary">
                                    Join Group
                                </Button>
                            )}

                            {isAdmin && (
                                <Button sx={{ margin: "1rem" }} onClick={addEvent} variant="contained" color="secondary">
                                    Add New Event
                                </Button>
                            )}
                        </div>
                        <hr color="#fecc01" />
                        <div>
                            <EventList events={group?.events} />
                        </div>
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
                                Members
                            </Typography>
                            {group?.members?.length > 0 ? (
                                <Stack
                                    mb={2}
                                    flexDirection="row"
                                    justifyContent="center"
                                    flexWrap="wrap"
                                    alignItems="center"
                                    gap={3}
                                >
                                    {group.members.map((member) => (
                                        <div key={member.user.id}>
                                            <Stack
                                                spacing={2}
                                                mb={2}
                                                justifyContent="center"
                                                flexWrap="wrap"
                                                alignItems="center"
                                                sx={{ border: "2px solid #fecc01", padding: "10px", borderRadius: "8px" }}
                                            >
                                                <User user={member.user} />
                                                <Typography
                                                    mt={1}
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
                                                    {member.points} Pts
                                                </Typography>
                                            </Stack>
                                        </div>
                                    ))}
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
                                    No Members available
                                </Typography>
                            )}
                        </div>
                        <Comments group={group} />
                    </div>
                )
            )}
        </div>
    );
}

export default GroupDetails