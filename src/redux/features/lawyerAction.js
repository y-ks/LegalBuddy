import axios from "axios";
import { message } from "antd";

export const lawyerLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/lawyers/login", reqObj);
    localStorage.setItem("name", JSON.stringify(response.data.name));
    localStorage.setItem("Id", JSON.stringify(response.data._id));
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

export const userRegister = (reqObj) => async (dispatch) => {
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
