import { useState } from 'react';

const useCookies = () => {
  const [cookies, setCookies] = useState({});

  const setCookie = (name, value, options = {}) => {
    const cookieOptions = {
      path: '/',
      ...options,
    };

    // 쿠키 만료 날짜 설정
    if (options.expires instanceof Date) {
      cookieOptions.expires = options.expires.toUTCString();
    } else if (typeof options.expires === 'number') {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + options.expires);
      cookieOptions.expires = expirationDate.toUTCString();
    }

    // 쿠키 설정
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${Object.entries(cookieOptions).map(([key, val]) => `${key}=${val}`).join('; ')}`;
    
    // 상태 업데이트
    setCookies({
      ...cookies,
      [name]: value,
    });
  };

  const removeCookie = (name, options = {}) => {
    // 만료 날짜를 과거로 설정하여 제거
    setCookie(name, '', { ...options, expires: new Date(0) });
  };

  const getCookie = (name) => {
    return cookies[name] || '';
  };

  return {
    cookies,
    setCookie,
    removeCookie,
    getCookie,
  };
};

export default useCookies;