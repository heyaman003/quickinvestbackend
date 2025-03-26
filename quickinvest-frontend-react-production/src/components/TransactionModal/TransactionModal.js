import React from "react";
import Modal from "../Admin/Modal/Modal";


const TransactionModal = ({
  openModal,
  setOpenModal,
  modalRef,
  modalTitle,
  objValue,
}) => {
  const keyValueArray = Object.entries(objValue).map(([key, value]) => ({
    key,
    value,
  }));
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      modalTitle={modalTitle}
      modalRef={modalRef}
    >
      <div className="ss-trade_commol_modal_field">
        <div
          className="transaction_details"
          style={{ textAlign: "left", marginTop: "20px" }}
        >
          {keyValueArray.map((d, i) => (
            <p key={i + 10} className="trans__row">
              <strong style={{ textTransform: "capitalize" }}>{d.key.replace(/([a-z])([A-Z])/g, "$1 $2")}: </strong>
              <span> {d.value}</span>
            </p>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;