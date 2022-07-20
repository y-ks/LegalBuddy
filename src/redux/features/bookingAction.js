import axios from "axios";
import { message } from "antd";

export const bookingRequest = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bookings/booklawyer", reqObj);
    message.success("BookingRequest Sent");
    setTimeout(() => {
      window.location.href = "/mybookings";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const bookingPayment = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bookings/payment", reqObj);
    setTimeout(() => {
      window.location.href = "/mybookings";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const removeUser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/admin/removeUser", reqObj);
    message.success("User removed");
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const verifyLawyer = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("api/admin/verifyLawyer", reqObj);
    message.success("Lawyer verified");

    setTimeout(() => {
      window.location.href = "/verifylawyers";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error.response);
    message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const rejectLawyer = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("api/admin/rejectLawyer", reqObj);
    message.success("Lawyer rejected");

    setTimeout(() => {
      window.location.href = "/verifylawyers";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error.response);
    message.error(error.response.data.message);
    dispatch({ type: "LOADING", payload: false });
  }
};
