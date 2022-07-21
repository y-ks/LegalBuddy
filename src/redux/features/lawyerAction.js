import axios from "axios";
import { message } from "antd";

export const lawyerLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/lawyers/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login success");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const lawyerRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("api/lawyers/register", reqObj);
    message.success("Registration success");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error.response);
    message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const rateLawyer = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("api/lawyers/rateLawyer", reqObj);
    message.success("Rated successfully");
    setTimeout(() => {
      window.location.href = "/mybookings";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error.response);
    message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const updateField = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("api/lawyers/update", reqObj);
    message.success("Update successfully");
    setTimeout(() => {
      window.location.href = "/mydetails";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error.response);
    message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};
