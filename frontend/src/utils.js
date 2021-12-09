export const login = (credential) => {
    const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;

    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to log in");
        }
    });
};

export const signup = (data) => {
    const signupUrl = "/signup";

    return fetch(signupUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to sign up");
        }
    });
};


export const getCenters = () => {
    return fetch("/centers").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get centers");
        }

        return response.json();
    });
};

export const getPackage = (packageId) => {
    return fetch("/package").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get package data");
        }

        return response.json();
    });
};

export const getOrders = (orderId) => {
    return fetch(`/package/${restId}/order`).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to get orders");
        }

        return response.json();
    });
};
export const checkout = () => {
    return fetch("/checkout").then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to checkout");
        }
    });
};

export const addItemToForm = (itemId) => {
    return fetch(`/order/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Fail to add package item to form");
        }
    });
};

