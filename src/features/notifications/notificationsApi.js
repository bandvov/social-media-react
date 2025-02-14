import axios from "axios";

export const fetchNotifications = async ( params) => {
  return await axios.get("http://localhost:8081",{
    params,
  });
};
