import React, { useState } from "react";
import UseModal from "../../../Global/hooks/useModal";

const Instagram = () => {
  const { handleCloseModal, handleOpenModal, ShowModalJSX } = UseModal();

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Modal
      </button>

      {ShowModalJSX(
        <>
          <h2 className="text-2xl">Hello, I'm a modal!</h2>
        </>
      )}
    </>
  );
};

export default Instagram;
