import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./DeleteButton.css";

const DeleteButton = ({ onDelete }) => {
  return (
    <FaTrashAlt 
      className="delete-icon" 
      onClick={onDelete}
      title="Delete this investment"
    />
  );
};

export default DeleteButton;
