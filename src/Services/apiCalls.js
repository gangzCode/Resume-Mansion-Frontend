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
