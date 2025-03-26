import React from "react";
import { Link, useLocation } from "react-router-dom";
const CustomLink = (props) => {
  let match = useLocation();
  // without link
  let A = (
    <Link
      to="#"
      className={`${props.className} ${
        props.href && match.pathname === props.href ? "active" : "inactive"
      }`}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </Link>
  );
  // with link
  if (props.href) {
    A = (
      <Link
        to={props.href}
        // onClick={props.onClick}
        className={`${props.className} ${
          props.href && match.pathname === props.href ? "active" : "inactive"
        }`}
        {...props}
      >
        {props.children}
      </Link>
    );
  }
  return A;
};

export default CustomLink;