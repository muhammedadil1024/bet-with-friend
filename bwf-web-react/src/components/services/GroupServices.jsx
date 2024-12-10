import { status } from "../../Utils";

export const getGroups = () => {
    
    return fetch(`http://127.0.0.1:8000/api/groups/`)
        .then(status)
        .catch((error) => console.error(error));
};

export const getGroup = (id) => {
    
    return fetch(`http://127.0.0.1:8000/api/groups/${id}/`)
        .then(status)
        .catch((error) => console.error(error));
};

export const joinGroup = (data, token) => {
    return fetch(`http://127.0.0.1:8000/api/members/join/`, {
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

export const leaveGroup = (data, token) => {
    return fetch(`http://127.0.0.1:8000/api/members/leave/`, {
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

export const postComment = (token, description, group, user) => {
    return fetch(`http://127.0.0.1:8000/api/comments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({description, group, user}),
    })
        .then(status)
        .then((data) => {
            return data
        })
        .catch((error) => console.error(error));
};