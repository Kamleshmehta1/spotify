export const authEndpoint = "https://accounts.spotify.com/authorize";

const redicrectUrl = "http://localhost:3000/";

const client_ID = "bc71acade04a47fa87177cf43e1ba9b4";

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokkenFromURL = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            // access to tokken key from the URL
            let parts = item.split('=')
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial
        }, {});
};


export const LoginURL = `${authEndpoint}?client_id=${client_ID}&redirect_uri=${redicrectUrl}&scopes=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;