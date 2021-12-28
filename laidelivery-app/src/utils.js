export const login = (credential) => {
  const loginUrl = `/login?email=${credential.email}&password=${credential.password}`;

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


export const getDeliveryOptions = (data) => {
  return fetch(`/getDeliveryOptions`, {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get delivery options");
    }
  });
}

export const getPackage = (packageId) => {
  return fetch(`/orders/${packageId}/package`).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get orders");
    }

    return response.json();
  });
};

export const getOrder = () => {
  return fetch("/package").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get orders");
    }

    return response.json();
  });
};

export const getCart = () => {
  return fetch("/cart").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
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

export const addItemToCart = (itemId) => {
  return fetch(`/order/${itemId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to add package item to shopping cart");
    }
  });
};