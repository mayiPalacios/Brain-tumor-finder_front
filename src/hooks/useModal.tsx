import { useState } from "react";

export default function useModal() {
  const [isModalActive, setIsModalActive] = useState(false);

  const closeModal = () => {
    setIsModalActive(false);
  };

  const showModal = () => {
    setIsModalActive(true);
  };

  return {
    isModalActive: isModalActive,
    showModal,
    closeModal,
  };
}
