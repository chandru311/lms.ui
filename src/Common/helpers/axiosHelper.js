import axios from "axios";
import { toast } from "react-toastify";
import config from "../../config";

function initializeHeader() {
  var authUser = sessionStorage.getItem("authUser");
  var authObj = JSON.parse(authUser);
  axios.defaults.baseURL = config.apiUrl;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = "Bearer " + authObj?.token;
}

const toastError = (error) => {
  return toast.error(`${error}`, {
    position: "top-right",
    autoClose: 3000,
    closeButton: false,
  });
};

export const getApiData = async (endpoint, params = {}) => {
  try {
    initializeHeader();
    const response = await axios.get(axios.defaults.baseURL + endpoint, {
      params,
    });
    return response.data;
  } catch (error) {
    toastError(error);
  }
};

export const postApiData = async (endpoint, data = {}) => {
  try {
    initializeHeader();
    const response = await axios.post(axios.defaults.baseURL + endpoint, data);
    return response.data;
  } catch (error) {
    toastError(error);
  }
};

export const putApiData = async (endpoint, data = {}) => {
  try {
    initializeHeader();
    const response = await axios.put(axios.defaults.baseURL + endpoint, data);
    return response.data;
  } catch (error) {
    toastError(error);
  }
};

export const deleteApiData = async (endpoint, data = {}) => {
  try {
    initializeHeader();
    const response = await axios.delete(config.a + endpoint, data);
    return response.data;
  } catch (error) {
    toastError(error);
  }
};

export default axios;
