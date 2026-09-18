export const saveAuth = (token,user) => {
    localStorage.setItem("forma_token", token);
    localStorage.setItem("forma_user", JSON.stringify(user));
}

export const getToken = () => {
    return localStorage.getItem("forma_token");
};

export const getUser = () => {
    const user = localStorage.getItem("forma_user");

    return user ? JSON.parse(user) : null;
}

export const clearAuth = () => {
    localStorage.removeItem("forma_token");
    localStorage.removeItem("forma_user");
};

export const isAuthenticated = () => {
    return !!getToken();
};