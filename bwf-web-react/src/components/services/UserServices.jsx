import { status } from "../../Utils";

export const auth = (credentials) => {
    return fetch("http://127.0.0.1:8000/api/authenticate/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
        .then(status).catch((error) => console.error(error));
};

export const register = (userData) => {
    return fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then(status)
        .then((data) => {
            // Process the response data here
            return data
        })
        .catch((error) => console.error(error));
};

export const uploadAvatar = (profileId, data) => {
    return fetch(`http://127.0.0.1:8000/api/profile/${profileId}/`, {
        method: "PUT",
        body: data,
    })
        .then(status)
        .catch((error) => console.error(error));
};

export const changePassword = (userData, userId, token) => {

    return fetch(`http://127.0.0.1:8000/api/users/${userId}/change_password/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify(userData),
    })
        .then(status)
        .then((data) => {
            // Process the response data here
            return data;
        })
        .catch((error) => console.error(error));
};