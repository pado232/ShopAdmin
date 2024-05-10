import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, expires) => {
  cookies.set(name, value, { path: "/", expires: expires });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  cookies.remove(name, { path: "/" });
};
