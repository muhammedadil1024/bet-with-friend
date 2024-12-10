import { useEffect, useState } from "react"
import { getEvent } from "../services/EventServices";


export const useFetchEvent = (token, eventId) => {

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            const getData = async () => {
                setLoading(true);
                const data = await getEvent(token, eventId);
                setEvent(data);
                setLoading(false);
            };
            getData();
        } catch (error) {
            console.log(error.message);
        }
    }, [eventId, token]);

    return [event, loading];
}