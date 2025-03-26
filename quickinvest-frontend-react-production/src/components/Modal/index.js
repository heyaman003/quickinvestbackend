import React from "react";

const Modal = ({ openModal, closeModal, modalTitle, children, className }) => {
  return (
    <div className={`modal ${openModal ?? ""} ${className ? className : ""}`}>
      <div className="overlay" onClick={closeModal}></div>
      <div className="modal__body">
        <div className="modal__title">
          <h2>{modalTitle}</h2>
          <div className="modal__close" onClick={closeModal}>
            &#x2715;
          </div>
        </div>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
