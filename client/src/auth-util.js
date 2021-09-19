export const isAuthorized = () => {
    const token = getToken();
    return token && token.length;
}

export const saveToken = (token) => {
    sessionStorage.setItem('basicAuthToken', token);
}

const getToken = () => {
    return sessionStorage.getItem('basicAuthToken');
}

export const prepareBasicAuthToken = (username, password) => {
    return btoa(`${username}:${password}`);
}

export const prepareAxiosOptions = (token = getToken()) => {
    return {
        headers: {
            Authorization: `Basic ${token}`
        }
    };
}
