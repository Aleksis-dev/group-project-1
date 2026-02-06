const API_URL = "http://127.0.0.1:8000"

const Ajax = async ({ route, method = "GET", headers = {}, body = null, }) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(API_URL + route, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Request failed");
    }

    return await response.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

export default Ajax;
