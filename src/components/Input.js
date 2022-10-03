import React from "react";

const Input = ({ type, name, handleChange, placeholder, error }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className={error ? "input-error input" : "input"}>
        </input>
      {error && (
          <label className="error-text">{error}</label>
      )}
    </>
  );
};

export default Input;
