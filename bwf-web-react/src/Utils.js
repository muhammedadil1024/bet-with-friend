export function status(response) {
    // res.ok
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    throw new Error(response.statusText);
}