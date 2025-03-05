import { status } from "../../Utils";

export const getEvent = (token, id) => {
    return fetch(`https://betwithfriend.codered.cloud/api/events/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    })
        .then(status)
        .catch((error) => console.error(error));
};

export const createEvent = (data, token) => {
    return fetch(`https://betwithfriend.codered.cloud/api/events/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
    })
        .then(status)
        .catch((error) => console.error(error));
};

export const sendBet = (token, item) => {
    return fetch(`https://betwithfriend.codered.cloud/api/bets/place_bet/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(item),
    })
        .then(status)
        .catch((error) => console.error(error));
};