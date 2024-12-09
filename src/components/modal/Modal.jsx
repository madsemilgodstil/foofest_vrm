"use client";
import Form from "@/components/form/Form";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return <Form />;
};

export default Modal;
