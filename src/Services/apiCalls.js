import axios from "axios";

export const baseUrl = "http://127.0.0.1:8000/api";

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
  try {
    const token = localStorage.getItem("token");

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
  try {
    const token = localStorage.getItem("token");
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
  try {
    const token = localStorage.getItem("token");

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
  try {
    const response = await fetch(`${baseUrl}/cart/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        order_id: orderId,
        addon_id: addonId,
        quantity: quantity,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update cart");
    }

    return data;
  } catch (error) {
    console.error("Update cart error:", error);
    throw error;
  }
};

export const deleteCartItem = async (addonId) => {
  try {
    const response = await fetch(`${baseUrl}/cart/delete/${addonId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove item");
    }

    return data;
  } catch (error) {
    console.error("Delete cart item error:", error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await fetch(`${baseUrl}/get-cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
