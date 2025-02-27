import axios from "axios";

// export const baseUrl = "http://127.0.0.1:8000/api";
export const baseUrl = "https://jtlanka.com/custom/API/public/api";

export const getIPAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error getting IP:", error);
    return "0.0.0.0";
  }
};

export const getFrequentlyAskedQuestions = async () => {
  try {
    const res = await axios.get(baseUrl + "/faqs", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const registerUser = async (full_name, email, contact_no, password) => {
  try {
    const response = await axios.post(
      `${baseUrl}/register`,
      {
        full_name: full_name,
        email: email,
        contact_no: contact_no,
        password: password,
        password_confirmation: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${baseUrl}/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const submitContactForm = async (
  name,
  email,
  subject,
  body,
  verifyCode
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/contact-us`,
      {
        name: name,
        email: email,
        subject: subject,
        body: body,
        verifyCode: verifyCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  }
};

export const getAcceptedReviews = async () => {
  try {
    const res = await axios.get(baseUrl + "/accept-review", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getPackages = async () => {
  try {
    const res = await axios.get(baseUrl + "/packeges", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    throw error.response ? error.response.status : error;
  }
};

export const getPackageAddons = async (packageId) => {
  try {
    const res = await axios.get(`${baseUrl}/packege/view/${packageId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const uploadCV = async (file, email) => {
  try {
    const formData = new FormData();
    formData.append("doc", file);
    formData.append("email", email);

    const response = await axios.post(`${baseUrl}/cv/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const addToCartService = async (cartData) => {
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    console.log("CART DATA>>> " + JSON.stringify(cartData));

    const response = await axios.post(`${baseUrl}/add-to-cart`, cartData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("RESPONSE ADD TO CART>>> " + JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const validatePromoCode = async (code) => {
  try {
    const response = await axios.get(`${baseUrl}/coupon?coupon=${code}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCartItems = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${baseUrl}/get-cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const clearCart = async () => {
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.delete(`${baseUrl}/cart/clear/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("RESPONSE CLEAR CART>>> " + response.data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateCartAddons = async (orderId, addonId, quantity) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${baseUrl}/cart/update`,
      {
        order_id: orderId,
        addon_id: addonId,
        quantity: quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update cart error:", error);
    throw error.response ? error.response.data : error;
  }
};

export const deleteCartItem = async (addonId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(`${baseUrl}/cart/delete/${addonId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Delete cart item error:", error);
    throw error.response ? error.response.data : error;
  }
};

export const getCart = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${baseUrl}/get-cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/cart/place-order`,
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCurrentOrder = async () => {
  const token = localStorage.getItem("token");

  console.log(token, "Token in current");
  try {
    const response = await axios.get(`${baseUrl}/current-order`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("CURRENT ORDER>>> " + JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getPreviousOrders = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${baseUrl}/previous-orders`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateCurrentOrder = async (orderData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${baseUrl}/current-order-update`,
      {
        order_id: orderData.order_id,
        payment_method_id: orderData.payment_method_id,
        addon_id: orderData.addon_id,
        quantity: orderData.quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update current order error:", error);
    throw error.response ? error.response.data : error;
  }
};

export const getPreviousOrderDetails = async (orderId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${baseUrl}/get-details/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getOrderMessages = async (orderId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${baseUrl}/messages/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Get order messages error:", error);
    throw error.response ? error.response.data : error;
  }
};

export const sendOrderMessage = async (orderId, message) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${baseUrl}/message`,
      {
        order_id: orderId,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Send message error:", error);
    throw error.response ? error.response.data : error;
  }
};
