import React from "react";

function DateFormat({ dateString }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 한 자리일 경우 앞에 0을 붙임
    const day = date.getDate().toString().padStart(2, "0"); // 한 자리일 경우 앞에 0을 붙임
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // 한 자리일 경우 앞에 0을 붙임
    const seconds = date.getSeconds().toString().padStart(2, "0"); // 한 자리일 경우 앞에 0을 붙임
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${year}-${month}-${day} ${ampm} ${formattedHours}:${minutes}:${seconds}`;
  };

  return <span>{formatDate(dateString)}</span>;
}

export default DateFormat;
