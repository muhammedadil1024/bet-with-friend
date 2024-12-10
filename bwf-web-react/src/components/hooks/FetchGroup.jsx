import { useEffect, useState } from "react";
import { getGroup } from "../services/GroupServices";


export const useFechGroup = (groupId) => {

    const [group, setGroup] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            const getData = async () => {
                setLoading(true);
                const data = await getGroup(groupId);
                setGroup(data);
                setLoading(false);
            };
            getData();
        } catch (error) {
            console.log(error.message);
        }
    }, [groupId])

    return [group, loading]

}