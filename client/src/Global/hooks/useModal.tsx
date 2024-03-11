import { useState } from "react";

const UseModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const ShowModalJSX = (children: JSX.Element[] | JSX.Element) => {
    if (!isModalOpen) {
      return null;
    }
    return (
      <div
        className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
        onClick={handleCloseModal}
      >
        <div
          className="relative bg-white rounded-lg p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            onClick={handleCloseModal}
            className="absolute top-1 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          >
            X
          </button>
        </div>
      </div>
    );
  };

  return { handleOpenModal, handleCloseModal, ShowModalJSX };
};

export default UseModal;
