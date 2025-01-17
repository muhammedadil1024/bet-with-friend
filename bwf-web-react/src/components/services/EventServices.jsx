import { status } from "../../Utils";

export const getEvent = (token, id) => {
    return fetch(`http://127.0.0.1:8000/api/events/${id}/`, {
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
    return fetch(`http://127.0.0.1:8000/api/events/`, {
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
    return fetch(`http://127.0.0.1:8000/api/bets/place_bet/`, {
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