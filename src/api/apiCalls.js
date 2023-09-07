import axios from "axios";

export const signUp = async (body) => {
  await axios.post("/api/v1/users", body);
};

export const login = (creds) => {
  return axios.post("/api/v1/auth", {}, { auth: creds });
};

export const changeLanguage = (lang) => {
  axios.defaults.headers["accept-language"] = lang;
};
