import React from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { Notification } from "../Notification/Notification";


const InputWithClipBoard = (props) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.value);
    Notification(`${props.label + " copied"}`, "success");
  };
  return (
    <div
      className={`input_group ${props.inputGroupClass}`}
      style={{ position: "relative", visibility: `${props.visibility}` }}
    >
      {props.label && (
        <label htmlFor={props.label}>
          {props.label}{" "}
          {props.isRequired && <span style={{ color: "red" }}>*</span>}{" "}
        </label>
      )}
      <input
        type={props.type}
        name={props.name}
        className={props.className}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        style={props.style}
        onChange={props.onChange}
        disabled={props.disabled}
        ref={props.ref}
      />
      {props?.copyToClipboard && (
        <span
          className="copyToClipboard"
          style={{
            position: "absolute",
            top: "39px",
            right: "-16px",
            padding: "3px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          onClick={() => copyToClipboard()}
        >
          <MdOutlineContentCopy />
        </span>
      )}
      {!props.error?.includes("required") && (
        <p style={{ color: "red", fontSize: "13px", width: "100%" }}>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default InputWithClipBoard;